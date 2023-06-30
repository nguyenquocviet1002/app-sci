import ReactDOM from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { useGetTarget } from '@/services/targetService';
import { removeFirstItem } from '@/utils/removeFirstItem';
import { formatMoney } from '@/utils/formatMoney';
import { useQuery } from '@tanstack/react-query';
import { createTargetFn, updateTargetFn } from '@/api/targetApi';
import { useGetAllUser } from '@/services/userService';
import Button from '@/components/UI/Button';

export default function ModalTarget({ isShowing, hide, element, token, infoTarget }) {
  const initialInfoTarget = useMemo(() => {
    return {
      token: token,
      user_seeding: infoTarget.user_seeding,
    };
  }, [token, infoTarget]);

  const initialValueTarget = useMemo(() => {
    return {
      token: token,
      id: '',
      kpi_date: '',
      kpi_target: '',
      user_seeding: infoTarget.user_seeding,
    };
  }, [token, infoTarget]);

  const initialAddTarget = useMemo(() => {
    return {
      token: token,
      kpi_date: '',
      kpi_target: '',
      user_seeding: infoTarget.user_seeding,
    };
  }, [token, infoTarget]);

  const [infoUser, setInfoUser] = useState(initialInfoTarget);
  const [infoValueTarget, setInfoValueTarget] = useState(initialValueTarget);
  const [infoAddTarget, setInfoAddTarget] = useState(initialAddTarget);
  const [dataTargetNew, setDataTargetNew] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const { dataTarget, isSuccessTarget, refetchTarget } = useGetTarget(infoUser);
  const { refetchAllUser } = useGetAllUser({ token: token, code_user: '' });
  const queryUpdateTarget = useQuery({
    queryKey: ['updateTarget'],
    queryFn: () => updateTargetFn(infoValueTarget),
    enabled: false,
    onSuccess: () => {
      refetchTarget();
      refetchAllUser();
    },
  });
  const queryCreateTarget = useQuery({
    queryKey: ['createTarget'],
    queryFn: () => createTargetFn(infoAddTarget),
    enabled: false,
    onSuccess: () => {
      refetchTarget();
      refetchAllUser();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      refetchTarget();
    }, 10);
    setInfoUser(initialInfoTarget);
    setInfoValueTarget(initialValueTarget);
    setInfoAddTarget(initialAddTarget);
  }, [refetchTarget, initialInfoTarget, initialValueTarget, initialAddTarget]);

  useEffect(() => {
    if (isSuccessTarget) {
      setDataTargetNew(removeFirstItem(dataTarget));
    }
  }, [dataTarget, isSuccessTarget]);

  const handleSubmit = () => {
    setTimeout(() => {
      queryUpdateTarget.refetch();
    }, 10);
  };

  const handleSubmitAdd = () => {
    setTimeout(() => {
      queryCreateTarget.refetch();
    }, 10);
  };

  return isShowing && element === 'ModalTarget'
    ? ReactDOM.createPortal(
        <>
          <div className="modal">
            <div className="modal__box modal__box--search">
              <div className="modal__content">
                <button type="button" className="modal__close" onClick={hide}>
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  </svg>
                </button>
                <h4 className="modal__head">{infoTarget.name}</h4>
                <div className="modal__line"></div>
                <div className="modal__around">
                  <div className="modal__body">
                    {isSuccessTarget &&
                      dataTargetNew.map((item, index) => (
                        <div key={index} className="modal__targetGroup">
                          <div className="modal__targetControl">{item.month}</div>
                          {isInput && item.id === infoValueTarget.id ? (
                            <input
                              className="modal__targetInput"
                              defaultValue={item.target}
                              onChange={(e) => setInfoValueTarget({ ...infoValueTarget, kpi_target: e.target.value })}
                            />
                          ) : (
                            <div className="modal__targetControl">{formatMoney(item.target)}</div>
                          )}

                          {isInput && item.id === infoValueTarget.id ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div
                                className="modal__targetSave"
                                onClick={() => {
                                  setIsInput(false);
                                  handleSubmit();
                                }}
                              >
                                Lưu
                              </div>
                              <div
                                className="modal__targetCancel"
                                onClick={() => {
                                  setIsInput(false);
                                }}
                              >
                                Hủy
                              </div>
                            </div>
                          ) : (
                            <div
                              className="modal__targetUpdate"
                              onClick={() => {
                                setIsInput(true);
                                setInfoValueTarget({ ...infoValueTarget, id: item.id, kpi_date: item.date });
                              }}
                            >
                              <img src={`${process.env.PUBLIC_URL}/images/pencil-solid.svg`} alt="" />
                            </div>
                          )}
                        </div>
                      ))}
                    {isAdd && (
                      <div className="modal__targetGroup">
                        <div className="modal__targetControl">
                          <input
                            type="date"
                            className="modal__targetInput modal__targetInput--1"
                            onChange={(e) => setInfoAddTarget({ ...infoAddTarget, kpi_date: e.target.value })}
                          />
                        </div>
                        <div className="modal__targetControl">
                          <input
                            type="text"
                            placeholder="Mục tiêu"
                            className="modal__targetInput modal__targetInput--1"
                            onChange={(e) => setInfoAddTarget({ ...infoAddTarget, kpi_target: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                    {isAdd ? (
                      <div className="modal__submit" style={{ display: 'flex', gap: '5px' }}>
                        <Button
                          event={() => {
                            setIsAdd(false);
                            handleSubmitAdd();
                          }}
                        >
                          Lưu
                        </Button>
                        <Button
                          event={() => {
                            setIsAdd(false);
                          }}
                          color="red"
                        >
                          Hủy
                        </Button>
                      </div>
                    ) : (
                      <div className="modal__submit">
                        <Button event={() => setIsAdd(true)}>Thêm mới</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal__bg" onClick={hide}></div>
        </>,
        document.body,
      )
    : null;
}
