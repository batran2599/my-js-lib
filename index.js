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
 */

let data = [
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
let dropdown = new MenuDropDown_tdb(".menu-dropdown", "input-demo", {title: "restaurantName", value: "restaurantCode"}, data);
dropdown.create("NH001");