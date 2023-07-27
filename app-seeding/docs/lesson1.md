# Lesson 1: Giới thiệu về ứng dụng Seeding

## 1. Giới thiệu các chức năng đang chạy thực tế

### 1.1. Đăng nhập

#### A. Yêu cầu

- Tạo 1 form đăng nhập cho người dùng với 2 trường số điện thoại và mật khẩu

- Khi click vào đăng nhập -> thành công: đi tới trang dashboard >< thất bại (do sai sdt hoặc mật khẩu, để trống, user đã bị vô hiệu hóa): hiển thị thông báo

- Khi chưa đăng nhập thì không được chuyển hướng tới trang khác

- Khi đã đăng nhập rồi thì không thể quay về trang đăng nhập nữa -> bắt buộc phải logout mới đăng nhập được

### 1.2. Header và Sidebar

#### A. Yêu cầu

- Header hiển thị được tên user

- Có 2 nút cta đổi mật khẩu và đăng xuất

- Ấn nút đổi mật khẩu hiện ra popup -> nhập mật khẩu mới và nhập lại mật khẩu đó để xác nhận -> không nhập hoặc nhập không trùng khớp thì hiện thông báo -> nhập đúng thì xử lý đổi mật khẩu thành công

- Ấn nút đăng xuất chuyển ra trang login

- Sidebar liệt kê được danh sách các trang, item menu trùng với trang đó thì active lên

- Chia ra sidebar dành cho admin và sidebar dành cho user

### 1.3. Màn form

#### A. Yêu cầu

- Liệt kê được danh sách form theo dạng data table

- Thêm mới form -> bắt buộc phải nhập 4 trường (họ tên, số điện thoại, dịch vụ, chi nhánh)

- Suggest chi nhánh khi nhập

- Xem chi tiết form

- Sửa và xóa form, khi xóa form có confirm xác nhận

- Tìm kiếm form, chia role nếu là admin thì thêm trường tìm kiếm theo tên nhân viên

### 1.4. Màn lead/booking

#### A. Yêu cầu

- Liệt kê danh sách lead hoặc booking theo lựa chọn của user theo dạng data table

- Xem chi tiết lead/booking

- Tìm kiếm lead/booking, chia role nếu là admin thì thêm trường tìm kiếm theo tên nhân viên

### 1.5. Màn số lượng form/booking

#### A.Yêu cầu

- Thể hiện được chi tiết số lượng form và booking theo tuần, tháng, năm và khoảng ngày

- Thể hiện được số lượng form và booking của từng thương hiệu theo tuần, tháng, năm và khoảng ngày

- Nếu là role admin thì xem được số lượng form và booking của từng nhân viên

### 1.6. Màn báo cáo số lượng thành công

#### A. Yêu cầu

- Thể hiện được số lượng khách hàng thành công của từng thương hiệu theo tuần, tháng, năm và khoảng ngày

- Thể hiện được số lượng các dịch vụ khách hàng đã thực hiện theo tuần, tháng, năm và khoảng ngày

- Tìm kiếm theo tên dịch vụ và theo từng thương hiệu

- Nếu là role admin thì xem được số lượng khách hàng thành công và số lượng dịch vụ đã thực hiện của từng nhân viên

### 1.7. Màn báo cáo chi phí

#### A. Yêu cầu

- Thể hiện được tiến độ hoàn thành mục tiên tháng của user đó

- Thể hiện được tổng số tiền của từng dịch vụ đã được làm theo tuần, tháng, năm, khoảng ngày

- Tìm kiếm theo tên dịch vụ và theo từng thương hiệu

- Thể hiện được tổng số tiền của từng thương hiệu tuần, tháng, năm, khoảng ngày

- Nếu là role admin thì xem được số tiền theo dịch vụ và theo thương hiệu của từng nhân viên của từng nhân viên

### 1.8. Màn nhân viên

#### A. Yêu cầu

- Chỉ admin mới có trang này

- Liệt kê danh sách nhân viên

- Không sử dụng được chức năng khi user đó bị vô hiệu hóa

- Thêm mới nhân viên

- Thay đổi mật khẩu của nhân viên

- Xem, thêm, sửa mục tiêu từng tháng của nhân viên

- Tìm kiếm theo mã nhân viên

### 1.9. Màn kiểm tra dữ liệu trùng

#### A. Yêu cầu

- Thông báo xác nhận user có muốn kiểm tra dữ liệu trùng không

- Liệt kê danh sách dữ liệu trùng

- Xem chi tiết dịch vụ và doanh thu mà khách hàng đó làm

- Tìm kiếm theo số điện thoại và ngày hẹn lịch của khách đó

## 2. Cấu trúc ứng dụng Seeding

<img src="https://i.imgur.com/QdHZ9f8.png">

- Folder api chứa các function gọi api
- Folder components chứa các component
- Folder hooks chứa các custom hook
- Folder screens chứa các màn hình được hiển thị

  - Trong folder screens chứa file root.jsx để xử lý router

    <img src="https://i.imgur.com/Ct4h5dM.png">

- Folder services chứa các function xử lý api
- Folder styles chứa các style global
- File index là file tổng

## 3. Giới thiệu package được sử dụng

[react-query](https://tanstack.com/query/latest/docs/react/overview) & [react-query-devtools](<(https://tanstack.com/query/latest/docs/react/overview)>) thư viện dùng để xử lý API. Giúp việc tìm nạp, lưu vào bộ đệm, đồng bộ hóa và cập nhật trạng thái máy chủ trong các ứng dụng web của bạn trở nên dễ dàng.

[react-chartjs-2](https://react-chartjs-2.js.org/) & [chart.js](https://www.chartjs.org/) thư viện biểu đồ

[react-data-table-component](https://react-data-table-component.netlify.app/) & [styled-components v5.3.9](https://react-data-table-component.netlify.app/) thư viện hỗ trợ data table

[axios](https://axios-http.com/vi/docs/intro) là một thư viện HTTP Client dựa trên Promise dành cho node.js và trình duyệt

[react-router-dom](https://reactrouter.com/en/main) thư viện hỗ trợ định tuyến router

[sass](https://www.npmjs.com/package/sass) thư viện compiler scss -> css
