class Loader_tdb {
    /**
     * Khởi tạo các giá ban đầu
     * @param {querySelector} viewSelector QuerySelector đến đối lượng HTML chứa đối tượng Loader
     */
    constructor() {
        this.colorOfRuner = "#019160"; // Màu đường biên chạy
        this.backgroundOfRuner = "#f3f3f3"; // Nền tròn
        this.runerWidth = "10px"; // Bề dày 
        this.objectRadius = "50px";

        this.view = document.querySelector("body");
        this.container = null;
        this.loaderObject = null;
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
     * Tạo đối tượng loader và thêm vào bên trong phần tử cha
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    create() {

        this.container = this.createHTMLTag("div", null, {
            width: "100%",
            height: "100vh",
            top: "0px",
            left: "0px",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000070",
        });

        this.loaderObject = this.createHTMLTag("div", null, {
            width: this.objectRadius,
            height: this.objectRadius,
            
            borderWidth: this.runerWidth,
            borderStyle: "solid",
            borderRadius: "50%",
            borderColor: this.backgroundOfRuner,

            borderTopWidth: this.runerWidth,
            borderTopStyle: "solid",
            borderTopColor: this.colorOfRuner,

            opacity: "none"
        });
        this.container.appendChild(this.loaderObject);
        this.view.appendChild(this.container);
        this.rotateAnimation();
    }

    /**
     * Tạo animation xoay tròn cho đối tượng
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    rotateAnimation() {
        let deg = 0;
        let rotate = ()=>{
            deg += 7;
            this.loaderObject.style.transform = `rotate(${deg}deg)`;
            if(deg >= 360) {
                deg = 0;
            }
            window.requestAnimationFrame(rotate);
        };
        rotate();
    }

    /**
     * Xóa đối tượng loader
     * CreadtedBy: Trần Duy Bá (13/01/2021)
     */
    remove() {
        this.view.removeChild(this.container);
    }
}