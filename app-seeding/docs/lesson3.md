# Lesson 3: Review dashboard và form

## 1. Review dashboard

### 1.1. Tạo component button

#### A. Yêu cầu

- Tạo một component button để có thể tái sử dụng mà không cần phải code mới

#### B. Triển khai

- Tạo component button

<img src="https://i.imgur.com/SS8Gy0X.png">

- Lấy từ props ra các tham số children, event, icon, color

- Xử lý để hiển thị màu, sự kiện click và icon

---

### 1.2. Header

#### A. Yêu cầu

- Có 2 button đổi mật khẩu và đăng xuất

- Hiển thị tên user

- Giao diện:

<img src="https://i.imgur.com/eZL7u7m.png">

#### B. Triển khai

- Tạo button đổi mật khẩu

- Gán event click mở ra modal đổi mật khẩu

<img src="https://i.imgur.com/8wOVVs1.png">

- Tạo button đăng xuất

<img src="https://i.imgur.com/AWxYbzq.png">

- Gán event click sẽ đăng xuất và redirect sang trang login

<img src="https://i.imgur.com/DdbFezo.png">

- Xử lý logic hiển thị tên user

  - Tạo function api get user và xử lý api qua library react query

<img src="https://i.imgur.com/0L8E1hN.png">

<img src="https://i.imgur.com/JT3TFFb.png">

    - Gọi data user ra và xử lý gán vào dom

<img src="https://i.imgur.com/GW4tOO1.png">

<img src="https://i.imgur.com/ikYMUv2.png">

---

### 1.3. Đổi mật khẩu

#### A. Yêu cầu

- Người dùng nhập mật khẩu và xác nhận mật khẩu để đổi mật khẩu

- Validate khi người dùng không nhập gì và nhập mật khẩu không trùng khớp

#### B. Triển khai

- Tạo component đổi mật khẩu

- Xử lý logic lấy value từ input và show validate

<img src="https://i.imgur.com/XkRObvi.png">

<img scr="https://i.imgur.com/2P1Viya.png">

<img src="https://i.imgur.com/2P1Viya.png">

- Tạo function api đổi mật khẩu

<img src ="https://i.imgur.com/KaQl9IU.png">

- Xử lý logic khi submit

  - Set validate khi người dùng để trống và khi nhập password không trùng khớp

  - Lấy token và password truyền vào function api đổi mật khẩu

  - Tắt modal khi hoàn thành và hiển thị thông báo

<img src="https://i.imgur.com/CEFrJR8.png">

---

### 1.4. Sidebar

#### A. Yêu cầu

- Hiển thị danh sách menu, tab

- Click vào item chuyển đến page tương ứng

- Active item khi ở trang tương ứng

#### B. Triển khai

- Chia sidebar làm 2 dành cho role admin và user

- Xử lý logic responsive

- Xử lý hover active

- Xử lý button check data

- Tạo modal confirm

---

## 2. Review form

### 2.1. Danh sách form

#### A. Yêu cầu

- Liệt kê được danh sách form

- Hiển thị được thông tin form

- Pagination chia page

- Rows per page

#### B. Triển khai

- Khởi tạo function api và xử lý api qua library react query

<img src="https://i.imgur.com/pZ4qcFI.png">

<img src="https://i.imgur.com/IjJJEjL.png">

- Gọi data từ function đã sử lý api

<img src="https://i.imgur.com/k8hZnl7.png">

- tạo biến columns theo library react table

  - name: title table
  - selector: key data
  - sortable: sắp xếp theo thứ tự
  - grow: độ co của cột

<img src="https://i.imgur.com/nBewm93.png">

- gọi data table vào dom

<img src="https://i.imgur.com/REMC5sI.png">

---

### 2.2. Xem chi tiết form

#### A. Yêu cầu

- click button hiện ra modal xem chi tiết form

#### B. Triển khai

- Tạo button xem thêm gán event click showMore và truyền vào id

<img src="https://i.imgur.com/2ZB0thn.png">

- xử lý fn showMore

  - từ id lọc ra được data tương ứng rồi gán vào state

<img src="https://i.imgur.com/mVGNJoS.png">

- truyền data vào component

<img src="https://i.imgur.com/L9KBdRv.png">

- xử lý component truyền data vào vị trí tương ứng

---

### 2.3. Thêm mới form

#### A. Yêu cầu

- click button thêm mới hiện ra modal form

- người dùng nhập thông tin vào form

- bắt buộc người dùng phải nhập một số trường đặc biệt

- click thêm mới để gửi form

#### B. Triển khai

- tạo button thêm mới

<img src="https://i.imgur.com/UmZNtNG.png">

- tạo api thêm mới form và xử lý api qua react query

<img src="https://i.imgur.com/VdtT9xO.png">

<img src="https://i.imgur.com/Aq4iykl.png">

- gán value người dùng nhập vào state

<img src="https://i.imgur.com/3seRHOT.png">

- xử lý logic khi click nút thêm mới

  - check validate khi người dùng không nhập trường bắt buộc

  - gửi thành công sẽ ẩn modal

<img src="https://i.imgur.com/LZXA5yQ.png">

---

### 2.4. Sửa form

#### A. Yêu cầu

- click button sửa hiện ra form sửa

- hiển thị thông tin form

- click button lưu thay đổi để sửa form

#### B. Triển khai

- tạo button sửa form

<img src="https://i.imgur.com/p0YlgYA.png">

- xử lý logic component modal update

- dùng useMemo xử lý data

<img src="https://i.imgur.com/wRfWdg8.png">

- tạo api sửa form và xử lý qua react query

<img src="https://i.imgur.com/djinx6G.png">

<img src="https://i.imgur.com/QADmqE0.png">

- click submit -> sửa form -> đóng modal

### 2.5. Xóa form

#### A.Yêu cầu

- click nút xóa form hiện ra modal xác nhận

- click đồng ý sẽ tiền hành xóa form

- click hủy sẽ đóng form

#### B.Triển khai

- tạo button xóa form truyền vào statte codeform

<img src="https://i.imgur.com/xNfZWMo.png">

- tạo api xóa và xử lý qua react query

<img src="https://i.imgur.com/32bQ9qK.png">

<img src="https://i.imgur.com/sjrZavh.png">

- truyền vào cpn modal confirm function xóa

<img src="https://i.imgur.com/UOvgOQ1.png">

- trong cpn confirm gán sự kiện cho 2 button

  - button đồng ý gán sự kiện xóa được lấy từ props và fn ẩn modal

  - button hủy gán fn ẩn modal

<img src="https://i.imgur.com/7EKow7s.png">

---

### 2.6. Tìm kiếm form

#### A.Yêu cầu

- Click nút tìm kiếm hiện ra form tìm kiếm

- Nhập các trường vào form tìm kiếm sẽ tìm hiển thị ra kết quả người dùng muốn tìm kiếm

#### B.Triển khai

- tạo nút tìm kiếm gán sự kiện hiển thị modal

<img src="https://i.imgur.com/FcbaH1u.png">

- tạo biến inital và gán vào state

<img src="https://i.imgur.com/36PJuEo.png">

- api tìm kiếm form chính là api get form nhưng được tryền thêm tham số vào để hiện thị data đúng theo yêu cầu nên sẽ dùng lại api get form cho search form

- gọi lại fn get form và truyền vào value input người dùng vừa nhập

<img src="https://i.imgur.com/atYRnTI.png">

- gán lại vào button submit để call api

<img src="https://i.imgur.com/Q8Z3vYJ.png">

---

### 2.7. lấy danh sách company

#### A. Yêu cầu

- Lấy được danh sách company và hiển thị ra

- tìm kiếm company theo tên

#### B. Triển khai

- tạo api lấy danh sách company và xử lý qua react query

<img src="https://i.imgur.com/mXcqIti.png">

<img src="https://i.imgur.com/dXA4HT0.png">

-
