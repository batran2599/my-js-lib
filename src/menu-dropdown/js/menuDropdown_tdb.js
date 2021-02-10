class MenuDropDown_tdb {
    /**
     * Tạo một DropDown
     * @param {querySelector} containingSelector Selector đến đối tượng HTML chứa Dropdown
     * @param {String} nameOfInputSaveOption Tên của thẻ input có type=hidden chứa dữ liệu đã chọn.
     * @param {Object} configData Đối tượng chứa 2 thuộc tính là title, value có giá trị là tên trường title và value muốn lấy trong đối tượng data
     * @param {Object} data Đối tượng chứa các trường dữ liệu là đối tượng configData yêu cầu, nếu lấy dữ liệu qua API thì bỏ qua
     * CreatedBy: Trần Duy Bá (13/01/2021)
     */
    constructor(containingSelector, nameOfInputSaveOption, configData = null, data = null) {
        this.containingObject = document.querySelector(containingSelector);
        this.nameOfInputSaveOption = nameOfInputSaveOption;
        this.configData = configData;
        this.data = data;

        this.displayOption;
        this.inputSaveOption; // Thẻ input chứa value của option đã chọn
        this.listOption = [];
        this.bgFocus = "#019160";
        this.textColorFocus = "#ffffff";
        this.urlIcon = "src/menu-dropdown/icons";

        this.tickIcon = "tick.svg";
        this.downArrow = "down-arrow.svg";
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
     * -------------------------------------------------------------------
     * Lấy dữ liệu thông qua API
     * @param {string} urlAPI  Đường dẫn API
     * @param {string} method Phương thức truyền dẫn dữ liệu GET, POST, ...
     * @param {Object} configAjax Cấu hình thêm cho ajax
     * CreatedBy: Trần Duy Bá (13/01/2021)
     */
    setDataWithAPI(urlAPI, method = "GET", configAjax = {}) {
        $.ajax({
            url: urlAPI,
            method: method,
            ...configAjax
        }).done((res)=>{
            this.data = res;
            this.create();
        }).fail(function(res){

            //alert("Lỗi lấy dữ liệu cho DropDown!");
            //console.log(res);
        });
    }

    /**
     * Tạo sự kiện click khi chọn option
     * CreadtedBy: Trần Duy Bá (24/01/2020)
     */
    setEventChooseOption() {
        if(this.listOption.length > 0) {
            for(let i = 0; i < this.listOption.length; i++) {
                this.listOption[i].onclick = ()=>{
                    this.focusOption.call(this, this.listOption[i]);
                };
            }
        }
    }

    /**
     * Tạo kiện khi focus vào option
     * @param {HTMLElement} option List các đối tượng thẻ option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    focusOption(option) {

        this.unfocusAllOption(); // unfocus tất cả các option trước khi tạo focus cho một option
        let tagChild = option.childNodes;
        
        tagChild[0].style.backgroundImage = `url(${this.urlIcon}/${this.tickIcon})`;
        tagChild[1].style.color = this.textColorFocus;

        option.style.backgroundColor = this.bgFocus;

        this.displayOption.innerText= tagChild[1].innerText;
        this.inputSaveOption.value = tagChild[1].getAttribute("value");
    };

    /**
     * Tạo sư kiện khi bỏ focus vào option
     * @param {HTMLElement} option List các đối tượng thẻ option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    unfocusOption(option) {
        let tagChild = option.childNodes;
        
        tagChild[0].style = "";
        tagChild[1].style = "";

        option.style = "";

        this.displayOption.innerText = "";
    };

    /**
     * Unfocus tất cả các option
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    unfocusAllOption() {
        for(let i = 0; i < this.listOption.length; i++) {
            this.unfocusOption(this.listOption[i]);
        }
    }

    /**
     * Khởi tạo đối tượng menu dropdown
     * @param {string} valueOfOption Gía trị của option muốn chọn
     * CreatedBy: Trần Duy Bá
     */
    create(valueOfOption = null) {
        if(this.data != null || this.configData == null) {
            this.containingObject.innerHTML = "";
            this.containingObject.classList.add("tdb-dropdown");

            this.inputSaveOption = this.createHTMLTag("input", {type: "hidden", name: this.nameOfInputSaveOption});
            this.containingObject.appendChild(this.inputSaveOption);

            this.displayOption = this.createHTMLTag("div", {class: "tdb-value-of-dropdown"});
            this.displayOption.style.backgroundImage = `url(${this.urlIcon}/${this.downArrow})`;
            this.containingObject.appendChild(this.displayOption);

            let containOption, option, icon, content;
            
            containOption = this.createHTMLTag("div", {class:"tdb-list-option"});

            $.each(this.data, (index, value)=>{
                option = this.createHTMLTag("div", {class: "tdb-option"});
                icon = this.createHTMLTag("div", {class: "tdb-icon"});
                content = this.createHTMLTag("div", {class: "tdb-content", value: value[this.configData.value], title: value[this.configData.title]});
                content.innerText = value[this.configData.title];
                option.appendChild(icon);
                option.appendChild(content);
                this.listOption.push(option);
                containOption.appendChild(option);
            });
            this.containingObject.appendChild(containOption);
            this.setEventChooseOption();

            if(valueOfOption != null) {
                this.chooseOption(valueOfOption);
            }
        } else {
            console.error("Chưa có data hoặc chưa cấu hình data cho DropDown");
        }

    }

    /**
     * Chọn option nhất định
     * @param {string} valueOfOption Gía trị của option muốn chọn
     * CreatedBy: Trần Duy Bá
     */
    chooseOption(valueOfOption = null) {
        let tagChild = null;
        for(let i = 0; i < this.listOption.length; i++) {
            tagChild = this.listOption[i].childNodes;
            if(valueOfOption != null && tagChild[1].getAttribute("value") == valueOfOption.toString()) {
                this.focusOption(this.listOption[i]);
                break;
            } else {
                this.inputSaveOption.valueOfOption = "";
                this.displayOption.innerText= "";
            }
        }
    } 

    /**
     * Thêm lựa chọn 
     * @param {object} option Đối tượng chứa thông tin option mới
     * CreatedBy: Trần Duy Bá
     */
    addOption(option = null) {
        if(option != null && this.data != null) {
            this.data.unshift(option);
        }
    }

    /**
     * Xét hiển thị và giá trị về mặc định
     * CreatedBy: Trần Duy Bá
     */
    setDefault() {
        this.unfocusAllOption();
        this.inputSaveOption.value = "";
    }
}