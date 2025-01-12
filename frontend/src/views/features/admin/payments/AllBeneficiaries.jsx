import React, { memo, useEffect, useState, useCallback } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { payeeActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash, AlertCircle, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const breadCumbs = [{ label: 'Beneficiaries', href: null }];

const headers = [
  { title: 'Payee Name', key: 'payeeName' },
  { title: 'Email Address', key: 'emailAddress' },
  { title: 'Contact Number', key: 'contactNumber' },
  { title: 'Account Number', key: 'bankDetails.accountNumber' },
  { title: 'Bank Name', key: 'bankDetails.bankName' },
  { title: 'IFSC Code', key: 'bankDetails.ifscCode' },
  { title: 'UPI Phone Number', key: 'upiPhoneNumber' },
];

const INITIAL_STATE = {
  limit: 10,
  page: 1,
  isOpen: false,
  deleteId: null,
  deleteInput: '',
  deleteLoading: false,
};

const resolveNestedKey = (obj, key) => {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const TableRow = memo(({ row, onDelete,onUpdate }) => (
  <>
    <Trash color="red" className="cursor-pointer size-5" onClick={() => {
      onDelete(row)
    }} />
    <Pencil color="black" className="cursor-pointer size-5" onClick={() => {
      onUpdate(row)
    }} />
  </>
));

const AllBeneficiaries = () => {
  const { getAllPayeeAction, deletePayeeAction } = payeeActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allPayee } = useSelector((state) => state?.payeeState || {});
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allPayee || allPayee?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getAllPayeeAction(query));
    }
  }, [info?.page, allPayee?.currentPage, dispatch]);

  const mappedDocs = allPayee?.docs?.map((item) => {
    const rowData = {};
    headers.forEach((header) => {
      rowData[header.key] = resolveNestedKey(item, header.key) || '-';
    });
    return { ...rowData, original: item }; // Include original item for actions
  });

  const deletePopupModalFunc = useCallback((deleteId = null) => {
    setInfo((prev) => ({ ...prev, deleteId, deleteInput: '' })
    )
  }, []);

  const changeInputDeleteHandlerFunction = useCallback((e) => {
    setInfo((prev) => ({ ...prev, deleteInput: e?.target?.value || '' }));
  }, []);

  const deletePayeeSubmitHandler = useCallback(async () => {
    if (!info?.deleteId || info?.deleteLoading) return;
    setInfo((prev) => ({ ...prev, deleteLoading: true }));

    const response = await deletePayeeAction(info?.deleteId?.original?._id);

    if (response[0] === true) {
      toast.success('Payee deleted successfully');

      dispatch(getAllPayeeAction(`limit=${info?.limit}&page=${info?.page}`));
      setInfo((prev) => ({ ...prev, deleteId: null, deleteInput: '', deleteLoading: false }));
    } else {
      toast.error(response[1]?.message || 'Failed to delete payee');
      setInfo((prev) => ({ ...prev, deleteLoading: false }));
    }
  }, [dispatch, info?.deleteId, info?.deleteLoading, info?.limit, info?.page]);

  const UpdateBeneficiary = (row) => {
    navigate(`/admin/expenses/payee/${row?.original?._id}`, { state: { payee: row?.original } });

  };


  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="w-full flex justify-end">      
            <Button variant="outline" onClick={() => navigate('/admin/expenses/payee/create-new-payee')} >Add New Beneficiary</Button>
        </div>
      <CustomTable1
        headers={headers}
        docs={mappedDocs}
        cardTitle="Beneficiaries"
        totalPages={allPayee?.totalPages}
        currentPage={allPayee?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => <TableRow row={row} onDelete={deletePopupModalFunc} onUpdate={UpdateBeneficiary}/>}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(info?.deleteId)} onOpenChange={() => deletePopupModalFunc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Beneficiary</DialogTitle>
          </DialogHeader>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This action cannot be undone. Please type the payee name to confirm.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Input
              id="payeeName"
              value={info?.deleteInput}
              onChange={changeInputDeleteHandlerFunction}
              placeholder={`Type "${info?.deleteId?.payeeName || ''}" to confirm`}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => deletePopupModalFunc(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deletePayeeSubmitHandler}
              disabled={
                info?.deleteInput !== info?.deleteId?.payeeName || info?.deleteLoading
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Mainwrapper>
  );
};

export default memo(AllBeneficiaries);
