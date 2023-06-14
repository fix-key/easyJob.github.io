$(() => {
    // 获取当前地址
    let url = window.location.href;

    // 获取keyword
    function getkeyword() {
        let keyword;

        if (url.indexOf('?') !== -1) {
            keyword = url.split('=');
            keyword = keyword[keyword.length - 1];
            keyword = decodeURI(keyword);
        } else {
            keyword = ''
        }

        return keyword;
    }


    // 跳转搜索
    function Jump_Search() {
        // 获取keyword
        let keyword = getkeyword();

        $("#search_input").val(keyword);
        // 进行搜索
        Search(keyword);
    }

    Jump_Search();

    // 搜索框搜索
    function Search_Box() {
        // 给搜索按钮绑定点击事件
        $("#search_btn").on('click', function () {
            // 获取搜索框内的文本
            let keyword = $("#search_input").val();
            // 搜索
            Search(keyword);
            Pagination();
        })

        $("#search_input").on('keyup', function (e) {
            if (e.keyCode == 13) {
                $('.job_list_box').html('');
                $("#search_btn").click();
            }
        })

    }

    Search_Box();

    // 搜索
    function Search(keyword) {
        // 清空之前的数据
        arrData = [];

        if (keyword) {
            ajaxSearch(keyword);
        } else {
            // 给用户提示
            $('.job_list_box').append($(`<div class="search_val_null">请重新输入后再搜索！</div>`));
        }
    }

    // 数据暂存点
    var arrData = [];
    // 页数
    var page_num = 1;

    // 页码条
    function Pagination() {
        $('.pagination').html('');
        // 计算页数
        page_num = Math.ceil(arrData.length / 5);

        if (page_num > 1) {

            $('.pagination').append($(`<div class="pagination_box">
                <div id="firstpage">首页</div>
                <div id="pageup">上一页</div>
                <div id="nowpage" style="background-color: #ff9c00;">1</div>
                <div id="pagedown">下一页</div>
                <div id="lastpage">尾页</div>
                <a id="page_num">共${page_num}页</a>                     
            </div>`))

            page_now = parseInt($('#nowpage').html());

            $('#firstpage').on('click', function () {
                $('#nowpage').html(1);
                page_now = parseInt($('#nowpage').html());
                loadData();
            })

            $('#lastpage').on('click', function () {
                $('#nowpage').html(page_num);
                page_now = parseInt($('#nowpage').html());
                loadData();
            })

            $('#pagedown').on('click', function () {
                if (page_now < page_num) {
                    $('#nowpage').html(page_now + 1);
                    page_now = parseInt($('#nowpage').html());
                    loadData();
                }

            })

            $('#pageup').on('click', function () {
                if (page_now > 1) {
                    $('#nowpage').html(page_now - 1);
                    page_now = parseInt($('#nowpage').html());
                    loadData();
                }
            })

        }

    }

    // 渲染数据
    function loadData() {
        // 清空数据
        arrData_show = [];

        $('.job_list_box').html('');

        // 获取当前页数
        let page_now = parseInt($('#nowpage').html());

        // arrData.length - page_num * 5

        if (page_num > 1) {
            arrData_show = arrData.slice((page_now - 1) * 5, page_now * 5);
            // arrData_show = arrData.slice(page_now - 1 * 5, page_num * 5);
            console.log(arrData_show);
        } else {
            arrData_show = arrData;
        }

        // arrData_show = arrData.slice();

        $.each(arrData_show, function (i, data_item) {
            // 创建 ul 元素
            $('.job_list_box').append($(`<ul>
                <li> <a class="job_list_box_active"> ${data_item.post} </a> <div class="job_list_note">全职招聘</div> </li>
                <li> <a> ${data_item.company} </a> </li>
                <li> <img src="../img/search/address.png" /> <a> ${data_item.address} </a></li>
                <li> <a>${data_item.time}</a> </li>
                <li> <a>${data_item.way}</a></li>
            </ul>`));
        });

    }

    // 发送请求
    function ajaxSearch(keyword) {
        $.ajax({
            // url
            url: 'http://127.0.0.1:8000/search-server',
            // 请求类型
            type: 'GET',
            // 响应体结果
            dataType: 'json',
            // 成功的回调
            success: function (data) {

                // console.log(data);
                // data = JSON.parse(data);

                $.each(data.list, function (i, data_item) {
                    // 判断是否有该字符串
                    if (this.post.trim().toUpperCase().indexOf(keyword.trim().toUpperCase()) !== -1) {
                        arrData.push(this);
                    }

                })

                if (arrData.length > 0) {
                    Pagination();
                    loadData();
                } else {
                    $('.job_list_box').append($(`<div class="search_val_null">暂无相关数据</div>`));
                }

                // 动态更新职位数量
                $('.job_active').text(arrData.length);
            }
        });
    }

})