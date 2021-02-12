/**
 * Demo sử dụng Modal
 */
const modal = new Modal_tdb();

document.querySelector(".modal-message").onclick = function(){
    modal.message(function(){
        alert("Hàm thực thi khi click confirm modal message");
    }, 
    "Thông báo", 
    "Xin chào bạn ! <br/> Cảm ơn vì bạn đã ghé thăm.",
    "Đóng modal",
    "Không có gì");
};

document.querySelector(".modal-warning").onclick = function(){
    modal.warning(function(){
        alert("Hàm thực thi khi click confirm modal warning");
    }, 
    "Cảnh báo", 
    "Xin chào bạn ! <br/> Nếu sử dụng lại thư viện này thì nhứ thay đổi đường dẫn url trong file js nhé.",
    "Tôi hiểu",
    "Tiếp tục");
};

document.querySelector(".modal-error").onclick = function(){
    modal.error(function(){
        alert("Hàm thực thi khi click confirm modal error");
    }, 
    "Có lỗi", 
    "Xin chào bạn ! <br/> Hiện tại thư viện này vẫn còn khá cùi bắp nên có thể chưa tương thích tốt với điện thoại.",
    "Tôi hiểu",
    "Tiếp tục");
};
/**
 * Kết thúc demo sử dụng Modal
 * -----------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Demo sử dung Alert Message
 */
const alertMessage = new AlertMessage_tdb();

document.querySelector(".alert-message-done").onclick = function(event){
    alertMessage.done(`Bạn vừa click vào button "${event.target.innerText}"`);
};

document.querySelector(".alert-message-info").onclick = function(event){
    alertMessage.info(`Bạn vừa click vào button "${event.target.innerText}"`);
};

document.querySelector(".alert-message-warning").onclick = function(event){
    alertMessage.warning(`Bạn vừa click vào button "${event.target.innerText}"`);
};

document.querySelector(".alert-message-error").onclick = function(event){
    alertMessage.error(`Bạn vừa click vào button "${event.target.innerText}"`);
};
/**
 * Kết thúc demo sử dụng Alert Message
 * -----------------------------------------------------------------------------------------------------------------------------
 */

 /**
  * Demo sử dụng menu dropdown
  */
const data = [
    {
        restaurantName: "Nhà hàng biển đông",
        restaurantCode: "NH001"
    },
    {
        restaurantName: "Nhà hàng biển tây",
        restaurantCode: "NH002"
    },
    {
        restaurantName: "Nhà hàng biển nam",
        restaurantCode: "NH003"
    },
    {
        restaurantName: "Nhà hàng biển bắc",
        restaurantCode: "NH004"
    }
];
const dropdown = new MenuDropDown_tdb(".menu-dropdown", "input-demo", {title: "restaurantName", value: "restaurantCode"}, data);
dropdown.create("NH001");
/**
 * Kết thúc demo sử dụng Menu Dropdown
 * -----------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Demo sử dụng Loader
 */
 const loader = new Loader_tdb();
 document.querySelector(".loader-tdb").onclick = function() {
    loader.create();
    setTimeout(function() {
        loader.remove();
    }, 1000);
 };
 /**
 * Kết thúc demo sử dụng Loader
 * -----------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Demo sử dụng Table
 */
const filter = new Filter_tdb();
const table = new Table_tdb();
table.tableSelector = ".table-test"; // Selector truy xuất với bảng chứa dữ liệu
table.recordId = {attrName: "employeeId", fieldName: "employeeId"}; // Cấu hình recordId để add recordId cho từng row
table.configTable = { // Cấu hình hiển thị khi show dữ liệu vào bảng
    employeeCode: {
        titleColumn: "Mã nhân viên", // Tiêu đề cột
        filterName: filter.type.general // Tên loại filter
    },
    fullName: {
        titleColumn: "Họ tên",
        filterName: filter.type.general
    },
    gender: {
        titleColumn: "Giới tính",
        filterName: filter.type.gender
    },
    dateOfBirth: {
        titleColumn: "Ngày sinh",
        filterName: filter.type.formatDate
    },
    phoneNumber: {
        titleColumn: "Số điện thoại",
        filterName: filter.type.general
    },
    email: {
        titleColumn: "Email",
        filterName: filter.type.general
    },
    positionName: {
        titleColumn: "Chức vụ",
        filterName: filter.type.general
    },
    departmentName: {
        titleColumn: "Phòng ban",
        filterName: filter.type.general
    },
    basicSalary: {
        titleColumn: "Mức lương hiện tại",
        filterName: filter.type.convertMoney
    },
    workStatus: {
        titleColumn: "Tình trạng công việc",
        filterName: filter.type.workStatus
    }
};
table.filter = new Filter_tdb();
table.loader = new Loader_tdb(".table-item");
table.setDataWithObjData(fakeData);
table.setEventClickToRow(function(){
    let attrName = table.recordId.attrName;
    let attrValue = $(this).data(attrName);
    let data = table.findData(attrName, attrValue);
    modal.message(
        null,
        "Thông báo",
        `Thông tin nhân viên bạn vửa chọn: <br/>
        <b>Tên</b>: ${data["fullName"]} <br/>
        <b>Mã nhân viên</b>: ${data["employeeCode"]} <br/>`
    );
});
document.querySelector(".refresh-table").onclick = function() {
    table.refreshTable();
    table.loader.create();
    setTimeout(()=>{
        table.loader.remove();
        alertMessage.done("Đã làm mới dữ liệu thành công !");
    }, 1000);
};
/**
 * Kết thúc demo sử dụng Loader
 * -----------------------------------------------------------------------------------------------------------------------------
 */