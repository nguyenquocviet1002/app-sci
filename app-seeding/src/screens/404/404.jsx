import { Link } from 'react-router-dom';

import page404Styles from './404.module.scss';

export default function Screen404() {
  return (
    <div className={page404Styles['error__body']}>
      <div className="container">
        <div className={page404Styles['error__row']}>
          <div className={page404Styles['error__col']}>
            <div className={page404Styles['error__page']}>
              <div className={page404Styles['error__inner']}>
                <div className={page404Styles['error__404']}>404</div>
                <div className={page404Styles['error__head']}>Không tìm thấy trang bạn đang tìm kiếm !!!</div>
                <div>
                  <Link to="/" className={page404Styles['error__btn']}>
                    Quay lại trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
