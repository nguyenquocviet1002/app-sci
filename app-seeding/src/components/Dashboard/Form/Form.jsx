import DataTable from 'react-data-table-component';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useModal } from '@/hooks/useModal';
import { useGetForm } from '@/services/formService';
import { useGetUser } from '@/services/userService';
import { removeFormFn } from '@/api/form';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { customStyles, paginationComponentOptions } from '@/utils/styleCustomTable';

import ModalSearchForm from '../ModalSearchForm';
import ModalCreateForm from '../ModalCreateForm';
import ModalMoreForm from '../ModalMoreForm';
import ModalUpdateForm from '../ModalUpdateForm';
import ModalConfirm from '../ModalConfirm';

import Loading from '@/components/UI/Loading';
import Button from '@/components/UI/Button';

import formStyles from './Form.module.scss';

export default function Form() {
  const [dataLeadItem, setDataLeadItem] = useState([]);
  const [filterSearch, setFilterSearch] = useState(false);
  const [infoFilter, setInfoFilter] = useState([]);
  const [codeRemove, setCodeRemove] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null);
  const { isShowing, cpn, toggle } = useModal();

  const info = useMemo(() => {
    return {
      token: token,
      brand_id: '',
      type: 'seeding',
      limit: 0,
      offset: 0,
      company_id: '',
      name_fb: '',
      phone: '',
      service: '',
      name: '',
      start_date: '',
      end_date: '',
      user_seeding: '',
    };
  }, [token]);

  const { dataForm, isLoadingForm, isFetchingForm, isSuccessForm, refetchForm } = useGetForm(info);
  const { dataUser, isSuccessUser } = useGetUser(token);

  const queryRemoveFrom = useQuery({
    queryKey: ['removeForm'],
    queryFn: () => removeFormFn({ code_form: codeRemove, token: token }),
    enabled: false,
    onSuccess: () => refetchForm(),
  });

  const showMore = (id) => {
    const dataOnly = dataForm.data.data.filter((item) => item.id === id);
    setDataLeadItem(dataOnly);
  };

  const showFilter = (info) => {
    setFilterSearch(true);
    setInfoFilter(info);
  };

  const removeFilter = () => {
    refetchForm();
    setFilterSearch(false);
    setInfoFilter([]);
  };

  const columns = [
    {
      name: 'Họ và tên',
      selector: (row) => row.name,
      sortable: true,
      grow: 1.5,
    },
    {
      name: 'Điện thoại',
      selector: (row) => row.phone,
    },
    {
      name: 'Dịch vụ đăng ký',
      selector: (row) => row.service,
    },
    {
      name: 'Chi nhánh',
      selector: (row) => row.company_name,
      grow: 1.5,
    },
    {
      name: 'Nhân viên',
      selector: (row) => row.seeding_user_name,
      omit: isSuccessUser && dataUser.data.data.rule === 'user' ? true : false,
    },
    {
      name: 'Ngày tạo',
      selector: (row) => new Date(row.create_date).toLocaleDateString('en-GB'),
    },
    {
      name: 'Xem thêm',
      cell: (row) => (
        <button
          className={formStyles['form__read']}
          onClick={() => {
            showMore(row.id);
            toggle('ModalMoreForm');
          }}
        >
          Xem thêm
        </button>
      ),
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <>
          <button
            className={formStyles['form__action']}
            onClick={() => {
              showMore(row.id);
              setTimeout(() => {
                toggle('ModalUpdateForm');
              }, 0);
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/images/pencil-solid.svg`} alt="" />
          </button>
          <button
            className={`${formStyles['form__action']} ${formStyles['form__action--red']}`}
            onClick={() => {
              setCodeRemove(row.code_form);
              toggle('ModalConfirm');
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/images/trash-solid.svg`} alt="" />
          </button>
        </>
      ),
      right: true,
      grow: 0.5,
    },
  ];

  return (
    <div className={formStyles['form__main']}>
      <div className={formStyles['form__head']}>
        <div className={formStyles['form__cta']}>
          <div className={formStyles['form__title']}>Danh Sách Form</div>
          <div className={formStyles['form__ctaLeft']}>
            {filterSearch ? (
              <div className={formStyles['form__removeFilter']}>
                <Button event={() => removeFilter()} color="red">
                  Xóa bộ lọc
                </Button>
              </div>
            ) : null}
            <div className={formStyles['form__ctaSearch']}>
              <Button event={() => toggle('ModalSearchForm')} icon="magnifying-glass-solid.svg">
                Tìm kiếm
              </Button>
            </div>
            <div className={formStyles['form__ctaAdd']}>
              <Button event={() => toggle('ModalCreateForm')} icon="plus-solid.svg">
                Thêm mới
              </Button>
            </div>
          </div>
        </div>
        {filterSearch ? (
          <div className={formStyles['form__filter']}>
            <p>Kết quả tìm kiếm cho: </p>
            <div>
              {infoFilter.name !== '' ? (
                <span className={formStyles['form__filterItem']}>Họ tên: {infoFilter.name}</span>
              ) : (
                ''
              )}
              {infoFilter.phone !== '' ? (
                <span className={formStyles['form__filterItem']}>Số điện thoại: {infoFilter.phone}</span>
              ) : (
                ''
              )}
              {infoFilter.service !== '' ? (
                <span className={formStyles['form__filterItem']}>Dịch vụ: {infoFilter.service}</span>
              ) : (
                ''
              )}
              {infoFilter.name_fb !== '' ? (
                <span className={formStyles['form__filterItem']}>Tên FB: {infoFilter.name_fb}</span>
              ) : (
                ''
              )}
              {infoFilter.company_name !== '' ? (
                <span className={formStyles['form__filterItem']}>Chi nhánh: {infoFilter.company_name}</span>
              ) : (
                ''
              )}
              {infoFilter.user_seeding !== '' ? (
                <span className={formStyles['form__filterItem']}>Tên nhân viên: {infoFilter.user_seeding}</span>
              ) : (
                ''
              )}
              {infoFilter.start_date !== '' ? (
                <span className={formStyles['form__filterItem']}>
                  Ngày bắt đầu: {new Date(infoFilter.start_date).toLocaleDateString('en-GB')}
                </span>
              ) : (
                ''
              )}
              {infoFilter.end_date !== '' ? (
                <span className={formStyles['form__filterItem']}>
                  Ngày kết thúc: {new Date(infoFilter.end_date).toLocaleDateString('en-GB')}
                </span>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : null}
      </div>

      {(isLoadingForm || isFetchingForm) && <Loading />}
      {isSuccessForm && (
        <div className={formStyles['form__table']}>
          <DataTable
            columns={columns}
            data={removeFirstItem(dataForm)}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[10, 20, 50]}
            customStyles={customStyles}
            highlightOnHover
          />
        </div>
      )}
      {isSuccessUser && (
        <>
          <ModalSearchForm
            isShowing={isShowing}
            hide={toggle}
            element={cpn}
            token={token}
            show={showFilter}
            rule={dataUser.data.data.rule}
          />
          <ModalMoreForm
            isShowing={isShowing}
            hide={toggle}
            element={cpn}
            data={dataLeadItem}
            rule={dataUser.data.data.rule}
          />
        </>
      )}
      <ModalUpdateForm
        isShowing={isShowing}
        hide={toggle}
        element={cpn}
        token={token}
        data={dataLeadItem}
        refetch={refetchForm}
      />
      <ModalConfirm isShowing={isShowing} hide={toggle} element={cpn} onSubmit={queryRemoveFrom.refetch}>
        Bạn có muốn xóa
      </ModalConfirm>
      <ModalCreateForm isShowing={isShowing} hide={toggle} element={cpn} token={token} refetch={refetchForm} />
    </div>
  );
}
