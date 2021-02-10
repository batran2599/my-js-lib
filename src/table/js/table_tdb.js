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
        this.tableSelector = null;
        this.configTable = null;
        this.configAjax = null;
        this.recordId = null;

        this.loader = new Loader_tdb();
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
     * CreatedBy: Trần Duy Bá (30/12/2020)
     * UpdateBy: Trần Duy Bá (14/01/2021)
     */
    setDataWithAPI(urlAPI, method, loader = true) {
        if(loader) {
            this.loader.create();
        }
        $.ajax({
            url: urlAPI,
            method: method,
            ...this.configAjax
        }).done((res)=>{
            this.setDataForTable(res, loader);
        }).fail(()=>{
            console.error("Lỗi khi lấy dữ liệu cho bảng !");
        });
    }

    /**
     * -----------------------------------------------------------------------------------------------
     * Nhận dữ liệu truyền vào dưới dạng Object sau đó đẩy vào bảng thông qua hàm SetDataForTable(data): 
     * @param {Object} data Object có format
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
    setDataWithObjData(data = null, loader = true) {
        if(data !== null) {
            if(loader) {
                this.loader.create();
            }
            this.setDataForTable(data, loader);
        }
    }

    /**
     * ---------------------------------------------
     * Nhận vào dữ liệu và hiển thị lên bảng dữ liệu
     * @param {*} data 
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
    setDataForTable(data, loader) {
        this.removeTitleColumn();
        this.removeContentTable()
        this.setTitleForColumn();
        let rowData = "";
        let tdTag = "";
        $.each(data, (index, itemRow)=>{ // Lặp qua từng dòng dữ liệu
            $.each(this.configTable, (indexTd)=>{ // Lặp qua thông tin cấu hình của bảng để lấy thuộc tính tương ứng với từng dòng data và tên của cột data tương ứng
                if(this.configTable[indexTd]["filterName"] !== undefined) { // Kiểm tra xem loại dữ liệu hiện tại có dùng đến filter không có thì dùng Filter tương ứng còn không thì thôi
                    tdTag += `<td>${Filter[this.configTable[indexTd]["filterName"]](itemRow[indexTd])}</td>`;
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

}