class Modal_tdb {
    constructor(viewSelector = "body") {
        this.listFormModal = [];
        this.listButtonCancelH = [];
        this.listButtonCancelF = [];
        this.listButtonConfirmF = [];

        this.urlIcon = "src/modal/icons";
        this.view = document.querySelector(viewSelector);
        this.containModal = null;
        this.headerModal = null;
        this.bodyModal = null;
        this.footerModal = null;
        this.containButton = null;
        this.formModal = null;
        this.titleModal = null;
        this.containIcon = null;
        this.iconModal = null;
        this.modalContent = null;
        this.buttonCancelH = null;
        this.buttonCancelF = null;
        this.buttonConfirmF = null;

        this.iconCancel = "x.svg";

        this.bagColorOfButtonConfirmInfo = "#01B075";

        this.iconWarning = "warning.svg";
        this.bagColorOfButtonConfirmWarning = "#F0C419";

        this.iconError = "error.svg";
        this.bagColorOfButtonConfirmError = "#F65454";
    }

    /**
     * 
     * @param {String} tagName Tên thẻ HTML muốn tạo
     * @param {Object} configAttr Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để tạo các attribute cho thẻ HTML
     * @param {Object} configStyle Đối tượng chứa các cặp thuộc tính và giá trị tương ứng để định kiểu style cho thẻ HTML
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    createHTMLTag(tagName = null, configAttr = null, configStyle = null) {
        let element = document.createElement(tagName);

        if(configAttr !== null) {
            let mapAttr = new Map(Object.entries(configAttr));
            mapAttr.forEach(function(attrValue, attrName){
                element.setAttribute(attrName, attrValue);
            });
        }

        if(configStyle !== null) {
            let mapStyle = new Map(Object.entries(configStyle));
            mapStyle.forEach(function(styleValue, styleName){
                element.style[styleName] = styleValue;
            });
        }

        return element;
    }

    /**
     * Tạo vùng chứa modal và thêm vùng chứa vào view nếu đang null
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    createContainModal() {
        if(this.containModal == null) {
            this.containModal = this.createHTMLTag("div", {class: "contain-modal"});
            this.view.appendChild(this.containModal);
        }
    }

    /**
     * Tạo form modal
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    createFormModal() {

        this.createContainModal();

        this.formModal = this.createHTMLTag("div", {class: "modal-tdb"});
        this.containModal.appendChild(this.formModal);
        
        this.headerModal = this.createHTMLTag("div", {class: "header-modal"});
        this.titleModal = this.createHTMLTag("p", {class: "title-modal"});
        this.buttonCancelH = this.createHTMLTag("button", {class: "cancel-modal"}, {backgroundImage: `url(${this.urlIcon}/${this.iconCancel})`});
        this.headerModal.appendChild(this.titleModal);
        this.headerModal.appendChild(this.buttonCancelH);

        this.bodyModal = this.createHTMLTag("div", {class: "body-modal"});
        this.containIcon = this.createHTMLTag("div", {class: "contain-icon"});
        this.iconModal = this.createHTMLTag("img", {class: "icon-modal"});
        this.modalContent = this.createHTMLTag("p", {class: "content-modal"});
        this.containIcon.appendChild(this.iconModal);
        this.bodyModal.appendChild(this.containIcon);
        this.bodyModal.appendChild(this.modalContent);

        this.footerModal = this.createHTMLTag("div", {class: "footer-modal"});
        this.containButton = this.createHTMLTag("div", {class: "contain-button-modal"});
        this.buttonCancelF = this.createHTMLTag("button", {class: "cancel-modal"});
        this.buttonConfirmF = this.createHTMLTag("button", {class: "confirm-modal"});
        this.containButton.appendChild(this.buttonCancelF);
        this.containButton.appendChild(this.buttonConfirmF);
        this.footerModal.appendChild(this.containButton);

        this.formModal.appendChild(this.headerModal);
        this.formModal.appendChild(this.bodyModal);
        this.formModal.appendChild(this.footerModal);

        this.listFormModal.push(this.formModal);
        this.listButtonCancelH.push(this.buttonCancelH);
        this.listButtonCancelF.push(this.buttonCancelF);
        this.listButtonConfirmF.push(this.buttonConfirmF);

        this.formModal.style.animationName = "fadeInDown";
        this.formModal.style.animationDuration = "0.6s";

    }

    /**
     * Xóa các button và form modal trong các mảng lưu trữ
     * @param {int} index Ví trí của thành phần muốn xóa trong mảng
     * createdBy: Trần Duy Bá (23/01/2021)
     */
    removeButtonInList(index) {
        this.listButtonCancelH.splice(index, 1);
        this.listButtonCancelF.splice(index, 1);
        this.listButtonConfirmF.splice(index, 1);
        this.listFormModal.splice(index, 1);
    }

    /**
     * Xóa đối form modal khỏi khung chứa form modal
     * @param {Int} index Chỉ số của form modal
     * CreatedBy: Trần Duy Bá (13/02/2021)
     */
    removeFormModal(index) {
        this.listFormModal[index].style.animationName = "fadeOutUp";
        this.listFormModal[index].style.animationDuration = "0.5s";
        setTimeout(()=>{
            this.containModal.removeChild(this.listFormModal[index]);
            this.removeButtonInList(index);
            if(this.listFormModal.length == 0) {
                this.containModal.style.backgroundColor = "#00000000";
                setTimeout(()=>{
                    this.view.removeChild(this.containModal);
                    this.containModal = null;
                }, 200);
            }
        }, 300);
    }

    /**
     * Xóa modal tương ứng với button nó bảo bọc đc truyền vào
     * @param {HTMLObjectElement} buttonCancelH Đối tượng buttom HTML ở phần header nằm trong form modal muốn xóa 
     * @param {HTMLObjectElement} buttonCancelF Đối tượng buttom HTML ở phần footer nằm trong form modal muốn xóa 
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    cancelModal(buttonCancelH = null, buttonCancelF = null) {
        let index = -1;
        if(buttonCancelH != null) {
            index = this.listButtonCancelH.indexOf(buttonCancelH);
            this.removeFormModal(index);
        } else if(buttonCancelF != null) {
            index = this.listButtonCancelF.indexOf(buttonCancelF);
            this.removeFormModal(index);
        }
    }

    /**
     * Tạo các sự kiện đóng modal
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setEventCancel() {
        let buttonCancelH = this.buttonCancelH;
        buttonCancelH.onclick = ()=>{
            this.cancelModal(buttonCancelH);
        };

        let buttonCancelF = this.buttonCancelF;
        buttonCancelF.onclick = ()=>{
            this.cancelModal(null, buttonCancelF);
        };
    }

    /**
     * Tạo sự kiện confirm modal
     * @param {Function} action Hành động muốn thực thi khi nhấn confirm
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    setEventConfirmF(action = null) {
        let buttonConfirm = this.buttonConfirmF;
        buttonConfirm.onclick = ()=>{
            if(action != null) {
                action();
            }
            /**
             * Lấy ra chỉ sổ của button confirm trong bảng từ đó gọi hàm cancelModal 
             * và truyền vào button cancel head cùng form modal
             */
            let index = this.listButtonConfirmF.indexOf(buttonConfirm);
            this.cancelModal(this.listButtonCancelH[index]);
        };
    }

    /**
     * Cấu hình style cho form modal
     * @param {*} title Tiêu đề modal
     * @param {*} content Nội dung hiển thị trong modal
     * @param {*} styleDisplayOfIcon Kiểu hiển thị của icon tương ứng với kiểu modal
     * @param {*} iconName  Tên file icon nếu không dùng thì truyền vào "null"
     * @param {*} titleButtomCancel Tiêu đề nút cancel của modal
     * @param {*} titleButtonConfirm Têu đề nút confirm của modal
     * @param {*} backgroundColorOfButtonConfirm  Màu nền của button confirm
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    configStyleOfFormModal(title, content, styleDisplayOfIcon, iconName, titleButtomCancel, titleButtonConfirm, backgroundColorOfButtonConfirm) {
        this.titleModal.innerText = title;
        this.modalContent.innerHTML = content;
        this.containIcon.style.display = styleDisplayOfIcon;
        if(iconName != null) {
            this.iconModal.src = `${this.urlIcon}/${iconName}`;
        }
        this.buttonCancelF.innerText = titleButtomCancel;
        this.buttonConfirmF.innerText = titleButtonConfirm;
        this.buttonConfirmF.style.backgroundColor = backgroundColorOfButtonConfirm;
    }
    
    /**
     * Cấu hình các thông số cần thiết cho form tương ứng và hiển thị form với kiểu thông báo
     * @param {Function} action Hành động sẽ được thực hiện khi nhấn confirm
     * @param {string} title Tiêu đề modal
     * @param {string} content Nội dung modal
     * @param {string} titleButtonCancel Tiêu đề nút cancel
     * @param {string} titleButtonConfirm  Tiêu đề nút confirm
     * CreatedBy: Trần Duy Bá
     */
    message(action = null, title = "Thông báo", content = "...", titleButtonCancel = "Hủy", titleButtonConfirm = "OK") {
        this.createFormModal();
        this.configStyleOfFormModal(
            title,
            content,
            "none",
            null,
            titleButtonCancel,
            titleButtonConfirm,
            this.bagColorOfButtonConfirmInfo
        );

        this.setEventCancel();
        this.setEventConfirmF(action);
    }

    /**
     * Cấu hình các thông số cần thiết cho form tương ứng và hiển thị form với kiểu thông báo
     * @param {Function} action Hành động sẽ được thực hiện khi nhấn confirm
     * @param {string} title Tiêu đề modal
     * @param {string} content Nội dung modal
     * @param {string} titleButtonCancel Tiêu đề nút cancel
     * @param {string} titleButtonConfirm  Tiêu đề nút confirm
     * CreatedBy: Trần Duy Bá
     */
    warning(action = null, title = "Cảnh báo", content = "...", titleButtonCancel = "Hủy", titleButtonConfirm = "OK") {
        this.createFormModal();
        this.configStyleOfFormModal(
            title,
            content,
            "block",
            this.iconWarning,
            titleButtonCancel,
            titleButtonConfirm,
            this.bagColorOfButtonConfirmWarning
        );
        this.setEventCancel();
        this.setEventConfirmF(action);
    }

    /**
     * Cấu hình các thông số cần thiết cho form tương ứng và hiển thị form với kiểu thông báo
     * @param {Function} action Hành động sẽ được thực hiện khi nhấn confirm
     * @param {string} title Tiêu đề modal
     * @param {string} content Nội dung modal
     * @param {string} titleButtonCancel Tiêu đề nút cancel
     * @param {string} titleButtonConfirm  Tiêu đề nút confirm
     * CreatedBy: Trần Duy Bá
     */
    error(action = null, title = "Cảnh báo nguy hiểm", content = "...", titleButtonCancel = "Hủy", titleButtonConfirm = "OK") {
        this.createFormModal();
        this.configStyleOfFormModal(
            title,
            content,
            "block",
            this.iconError,
            titleButtonCancel,
            titleButtonConfirm,
            this.bagColorOfButtonConfirmError
        );

        this.setEventCancel();
        this.setEventConfirmF(action);
    }
}