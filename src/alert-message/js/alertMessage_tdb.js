class AlertMessage_tdb {
    constructor(viewSelector = "body") {
        this.listMessages = [];
        this.listButtonRemove = [];

        this.view = document.querySelector(viewSelector);
        this.containMessages = null;
        this.form = null;
        this.urlIcon = "src/alert-message/icons";
        this.iconOfType = null;
        this.content = null;
        this.buttonRemove = null;

        this.iconTypeDone = "done.svg";
        this.iconRemoveTypeDone = "x-done.svg";
        this.backgroundFormDone = "#BAFFE7";

        this.iconTypeWarning = "warning.svg";
        this.iconRemoveTypeWarning = "x-warning.svg";
        this.backgroundFormWarning = "#FFE7AF";

        this.iconTypeError = "error.svg";
        this.iconRemoveTypeError = "x-error.svg";
        this.backgroundFormError = "#FFCECE";

        this.iconTypeInfo = "info.svg";
        this.iconRemoveTypeInfo = "x-info.svg";
        this.backgroundFormInfo = "#D8EAFF";

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
     * Xóa modal tương ứng với button nó bảo bọc đc truyền vào
     * @param {HTMLObjectElement} buttonCancelH Đối tượng buttom HTML ở phần header nằm trong form modal muốn xóa 
     * @param {HTMLObjectElement} buttonCancelF Đối tượng buttom HTML ở phần footer nằm trong form modal muốn xóa 
     * CreatedBy: Trần Duy Bá (23/01/2021)
     */
    cancelModal(buttonCancelH = null, buttonCancelF = null) {
        let index = -1;
        if(buttonCancelH != null) {
            index = this.listButtonCancelH.indexOf(buttonCancelH);
            this.containModal.removeChild(this.listFormModal[index]);
            this.removeButtonInList(index);
        } else if(buttonCancelF != null) {
            index = this.listButtonCancelF.indexOf(buttonCancelF);
            this.containModal.removeChild(this.listFormModal[index]);
            this.removeButtonInList(index);
        }

        if(this.listFormModal.length == 0) {
            this.view.removeChild(this.containModal);
            this.containModal = null;
        }
    }

    /**
     * Tạo đối tượng chứa các message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    createContainMessage() {
        if(this.containMessages == null){
            this.containMessages = this.createHTMLTag("div", {class: "contain-messages"});
            this.view.appendChild(this.containMessages);
        }
    }

    /**
     * Tạo một form message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    createFormMessage() {
        this.createContainMessage();
        this.form = this.createHTMLTag("div", {class: "form-message"});
        this.iconOfType = this.createHTMLTag("img", {class: "icon-type-of-message"});
        this.content = this.createHTMLTag("p", {class: "content-message"});
        this.buttonRemove = this.createHTMLTag("button", {class: "remove-massage"});
        this.form.appendChild(this.iconOfType);
        this.form.appendChild(this.content);
        this.form.appendChild(this.buttonRemove);
    
        this.listMessages.push(this.form);
        this.listButtonRemove.push(this.buttonRemove);
        this.setEventRemove();

        this.form.style.animationName = "fadeInDown";
        this.form.style.animationDuration = "0.5s";
        this.containMessages.appendChild(this.form);
    }

    /**
     * Cấu hình style cho message
     * @param {string} content Nội dung message
     * @param {string} iconName Tên file icon tương ứng với kiểu message
     * @param {string} iconRemove Tên file icon remove tương ứng với message
     * @param {color} backgroundColorOfForm Màu nền của form menu
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    configStyleOfForm(content, iconName, iconRemove, backgroundColorOfForm) {
        this.content.innerHTML = content;
        this.iconOfType.src = `${this.urlIcon}/${iconName}`;
        this.buttonRemove.style.backgroundImage = `url(${this.urlIcon}/${iconRemove})`;
        this.form.style.backgroundColor = backgroundColorOfForm;
        this.content.title = content;
    }

    /**
     * Tạo message dạng done
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    done(content = "Đã xong !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeDone, this.iconRemoveTypeDone, this.backgroundFormDone);
    }

    /**
     * Tạo message dạng error
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    error(content = "Có vẫn đề !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeError, this.iconRemoveTypeError, this.backgroundFormError);
    }

    /**
     * Tạo message dạng warning
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    warning(content = "Cảnh báo !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeWarning, this.iconRemoveTypeWarning, this.backgroundFormWarning);
    }

    /**
     * Tạo message dạng info
     * @param {string} content Nội dung của message
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    info(content = "Thông báo !") {
        this.createFormMessage();
        this.configStyleOfForm(content, this.iconTypeInfo, this.iconRemoveTypeInfo, this.backgroundFormInfo);
    }

    /**
     * Xóa form message khỏi danh sách hiển thị và lưu trữ
     * @param {HTMLElement} button Đối tượng Button close HTML
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    removeFormMessage(button) {
        let index = this.listButtonRemove.indexOf(button);
        if(index >= 0) {
            let numNull = 0;
            this.listMessages[index].style.animationName = "fadeOutRight";
            this.listMessages[index].style.animationDuration = "0.6s";
            setTimeout(()=>{
                this.containMessages.removeChild(this.listMessages[index]);
                this.listMessages.splice(index, 1, null);
                this.listButtonRemove.splice(index, 1, null);
                this.listMessages.forEach((value)=>{
                    if(value === null)
                        ++numNull;
                });
                if(numNull == this.listButtonRemove.length) {
                    this.view.removeChild(this.containMessages);
                    this.listMessages = [];
                    this.listButtonRemove = [];
                    this.containMessages = null;
                }
                
            }, 500);
        }
    }

    /**
     * Tạo sự kiện xóa
     * CreatedBy: Trần Duy Bá (23/01/2020)
     */
    setEventRemove() {
        let button = this.buttonRemove;
        button.onclick = ()=>{
            this.removeFormMessage(button);
        };
        setTimeout(function(){
            button.click();
        }, 5000);
    }
}