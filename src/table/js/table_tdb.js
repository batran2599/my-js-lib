class Table_tdb {
    /**
     * Khởi tạo các dữ liệu cần thiết
     * @param {querySelector} tableSelector // Selector của bảng muốn hiển thị dữ liệu
     * @param {object} configTable // Đối tượng cấu hình cho việc hiển thị bảng và lấy dữ liệu từ đối tượng chứa dữ liệu có format:
     * configTable = {
     *      Tên_property_chứa_data_cần_lấy : {
     *          CName: "Tiêu đề cột tương ứng",
     *          FName: "Tên Filter muốn dùng" // có thể lấy trong đối tượng Filter.Type.Loại_filter
     *      }
     * }
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    constructor () {
        this.actionWhenClickToRow = null;
        this.tableSelector = null;
        this.configTable = null;
        this.recordId = null;
        this.filter = null;
        this.loader = null;
        this.data = null;
        this.urlAPI = null;
        this.method = null;
        this.configAjax = null;
    }

    /**
     * Đặt tiêu đề cho cột trong bảng
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    setTitleForColumn() {
        let listTh = "";
        $.each(this.configTable, (index, value)=>{
            listTh += `<th>${value.titleColumn}</th>`;
        });
        $(`${this.tableSelector} > thead`).append(`<tr>${listTh}</tr>`);
    };

    /**
     * -------------------------------------------------------------------
     * Lấy dữ liệu thông qua API rồi đẩy vào bảng
     * @param {string} urlAPI  Đường dẫn API
     * @param {string} method Phương thức truyền dẫn dữ liệu GET, POST, ...
     * @param {bool} loader Xác định xem có sử dụng đối tượng Loader không
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    setDataWithAPI(urlAPI = null, method = "GET", loader = false) {
        this.urlAPI = urlAPI;
        this.method = method;
        if(loader) {
            this.loader.create();
        }
        if(urlAPI != null) {
            $.ajax({
                url: urlAPI,
                method: method,
                ...this.configAjax
            }).done((res)=>{
                this.data = res;
                this.setDataForTable(loader);
            }).fail(()=>{
                console.error("Lỗi khi lấy dữ liệu cho bảng !");
            });
        } else {
            console.error("Chưa truyền url API.");
        }
    }

    /**
     * -----------------------------------------------------------------------------------------------
     * Nhận dữ liệu truyền vào dưới dạng Object sau đó đẩy vào bảng thông qua hàm SetDataForTable(data): 
     * @param {Array} data Mảng các đối tượng dữ liệu
     * @param {Bool} loader Xác định xem có sử dụng đối tượng Loader không
     * data =  {
     *      any: {
     *          property: value,
     *          ...
     *      },
     *      ...
     * };
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    setDataWithObjData(data = null, loader = false) {
        if(data !== null) {
            if(loader) {
                this.loader.create();
            }
            this.data = data;
            this.setDataForTable(loader);
        } else {
            console.error("Chưa truyền dữ liệu.")
        }
    }

    /**
     * ---------------------------------------------
     * Nhận vào dữ liệu và hiển thị lên bảng dữ liệu
     * @param {bool} loader Xác định xem có sử dụng đối tượng Loader không
     * data =  {
     *      any: {
     *          property: value,
     *          ...
     *      },
     *      ...
     * };
     * CreatedBy: Trần Duy Bá (24/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    setDataForTable(loader = false) {
        $(this.tableSelector).addClass("table-tdb");
        this.removeTitleColumn();
        this.removeContentTable()
        this.setTitleForColumn();
        let rowData = "";
        let tdTag = "";
        $.each(this.data, (index, itemRow)=>{ // Lặp qua từng dòng dữ liệu
            $.each(this.configTable, (indexTd)=>{ // Lặp qua thông tin cấu hình của bảng để lấy thuộc tính tương ứng với từng dòng data và tên của cột data tương ứng
                if(this.configTable[indexTd]["filterName"] !== undefined && this.filter != null) { // Kiểm tra xem loại dữ liệu hiện tại có dùng đến filter không có thì dùng Filter tương ứng còn không thì thôi
                    tdTag += `<td>${this.filter[this.configTable[indexTd]["filterName"]](itemRow[indexTd])}</td>`;
                } else {
                    tdTag += `<td>${itemRow[indexTd]}</td>`;
                }
            });
            if(this.recordId == null){
                rowData = `<tr>${tdTag}</tr>`;
            } else {
                if(this.recordId.attrName != undefined) {
                    rowData = $(`<tr>${tdTag}</tr>`);
                    $(rowData).data(this.recordId.attrName, itemRow[this.recordId.fieldName]);
                } else {
                    rowData = $(`<tr>${tdTag}</tr>`);
                    $(rowData).data("recordId", itemRow[this.recordId.fieldName]);
                }
            }
            tdTag = "";
            $(`${this.tableSelector} > tbody`).append(rowData);
        });
        if(loader) {
            this.loader.remove();
        }
    }

    /**
     * Xóa tiêu đề cột
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    removeTitleColumn() {
        $(`${this.tableSelector} > thead > tr`).remove();
    }
    
    /**
     * Xóa dữ liệu của bảng
     * CreatedBy: Trần Duy Bá (24/12/2020)
     */
    removeContentTable() {
        $(`${this.tableSelector} > tbody > tr`).remove();
    }

    /**
     * Làm mới lại bảng dữ liệu, nếu data truyền vào là null thì dữ liệu sẽ được lấy lại qua API còn
     * nếu data có dữ liệu thì nó sẽ sử dụng dữ liệu này.
     * @param {Array} data Mảng các đối tượng dữ liệu (mặc định là null)
     * @param {Bool} loader Xác định xem có sử dụng đối tượng Loader không
     * CreatedBy: Trần Duy Bá (11/02/2021)
     */
    refreshTable(data = null, loader = false) {
        this.removeTitleColumn();
        this.removeContentTable();
        if(data == null) {
            this.setDataWithAPI(this.urlAPI, this.method, loader);
        } else {
            this.setDataWithObjData(data, loader);
        }
        this.setEventClickToRow(this.actionWhenClickToRow);
    }

    /**
     * Tìm đối tượng dữ liệu trong mảng dữ liệu data hiện đang được lưu
     * @param {*} attrName Tên thuộc tính trong mảng dữ liệu data
     * @param {*} attrValue Giá trị của thuộc tính trong mảng dữ liệu data
     * CreatedBy: Trần Duy Bá (12/02/2021)
     */
    findData(attrName = null, attrValue = null) {
        if(attrName != null || attrValue != null) {
            for(let  i = 0; i < this.data.length; i++) {
                if(this.data[i][attrName] == attrValue)
                    return this.data[i];
            }
        } else {
            console.error("Thông tin tìm kiếm chưa đầy đủ.");
        }
        return null;
    }

    /**
     * Tạo hành động khi click vào mỗi dòng dữ liệu trong bảng
     * @param {*} action Hành động cần thực hiện
     */
    setEventClickToRow(action = null) {
        this.actionWhenClickToRow = action;
        $(this.tableSelector + " > tbody > tr").click(this.actionWhenClickToRow);
    }

}