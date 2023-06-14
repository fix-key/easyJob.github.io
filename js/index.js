window.addEventListener('load', function () {
    // 登录注册
    var a = document.querySelectorAll(".header_login a");

    function loginList() {
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener("mouseover", function () {
                for (let i = 0; i < a.length; i++) {
                    a[i].className = '';
                }
                this.className = 'hdon';
            });
        }
    }

    loginList();

    // 用户登录
    var p = document.querySelectorAll(".lg_title p");
    var lg_main = document.querySelectorAll(".lg_main");

    function userLogin() {
        for (let i = 0; i < p.length; i++) {
            p[i].addEventListener("click", function () {
                for (let i = 0; i < p.length; i++) {
                    p[i].classList.remove('clicked');
                    lg_main[i].style.display = 'none';
                }
                this.classList.add('clicked');
                lg_main[i].style.display = 'block';
            })
        }
    }

    userLogin();

    var code = document.querySelector('.reg_yzm_num');
    var refresh = document.querySelector('.refresh');

    // 点击刷新验证码
    refresh.addEventListener('click', function () {
        vcCode();
    })

    // 验证码
    function vcCode() {
        codeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'R', 'W', 'X', 'Y', 'Z'];

        code.innerHTML = '';

        for (var i = 0; i < 4; i++) {
            num = Math.floor(Math.random() * 36);
            code.innerHTML += codeList[num];
        }

    }

    vcCode();

    var banner_left = document.querySelector(".button_left img");
    var banner_right = document.querySelector(".button_right img");
    var banner_list = document.querySelector(".banner_list");
    var banner_lists = document.querySelector(".banner_list ul");
    var banner_index = document.querySelector(".banner_index");

    // 图片轮播
    function Carousel() {

        banner_list.addEventListener("mouseover", function () {
            banner_left.style.display = 'block';
            banner_right.style.display = 'block';
            // 停止计时器
            clearInterval(timer);
            timer = null;  // 清除定时器变量
        })
        banner_list.addEventListener("mouseout", function () {
            banner_left.style.display = 'none';
            banner_right.style.display = 'none';
            // 停止计时器
            clearInterval(timer);
            timer = setInterval(function () {
                // 手动调用点击事件
                banner_right.click();
            }, 2000);
        })

        // 点击右侧按钮，图片滚动一张
        var num = 0;
        // circle 控制小圆圈的播放
        var circle = 0;
        // 右箭头
        banner_right.addEventListener("click", function () {
            if (num == banner_index.children.length - 1) {
                banner_lists.style.left = 0;
                num = 0;
            } else {
                num++;
            }

            circle = circle == banner_index.children.length - 1 ? 0 : circle += 1;

            circleChange();
        })
        // 左箭头
        banner_left.addEventListener("click", function () {
            if (num == 0) {
                banner_lists.style.left = -banner_list.clientWidth * banner_lists.children.length - 1 + 'px';
                num = banner_lists.children.length - 1;
            } else {
                num--;
            }

            circle = circle == 0 ? banner_index.children.length - 1 : circle -= 1;

            circleChange();
        })

        // 轮播移动和原点移动
        function circleChange() {
            bannerMove();

            for (var i = 0; i < banner_index.children.length; i++) {
                banner_index.children[i].className = '';
            }

            banner_index.children[circle].className = 'active';
        }

        // 轮播移动
        function bannerMove() {
            banner_lists.style.left = -banner_list.clientWidth * num + 'px';
        }

        // 鼠标触碰小圆点，进行对应轮播
        function circleMove() {
            for (let i = 0; i < banner_index.children.length; i++) {
                banner_index.children[i].addEventListener("mouseover", function () {
                    num = i;
                    circle = i;
                    circleChange();
                })
                banner_index.children[i].addEventListener("mouseout", function () {
                    num = i;
                    circle = i;
                    circleChange();
                })
            }

        }

        // 自动播放轮播图
        var timer = setInterval(function () {
            // 手动调用点击事件
            banner_right.click();
        }, 2000);

        // 鼠标触碰小圆点，进行对应轮播
        circleMove();
    }

    Carousel();

    var num_statistics = document.querySelectorAll('.num_statistics li');

    // 在线人数统计
    function scrollFn() {

        timeStamp();

        function timeStamp() {
            var nowTime = nowTimer();
            var num_timer = setTimeout(function () {
                var futureTime = nowTimer();
                imgChange(nowTime, futureTime, function () {
                    SecondMove();
                    timeStamp();
                })


            }, 1000)


        }


        // 更改与移动图片
        function imgChange(nowTime, futureTime, callback) {
            for (let i = 0; i < num_statistics.length; i++) {
                num_statistics[i].children[0].src = 'img/index/' + nowTime[i] + '.png';
                num_statistics[i].children[1].src = 'img/index/' + futureTime[i] + '.png';
            }
            callback && callback();
        }

        // 获取现在的时间
        function nowTimer() {
            var date = new Date();
            var h = date.getHours();
            h = h < 10 ? '0' + h : h;
            var m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            var s = date.getSeconds();
            s = s < 10 ? '0' + s : s;

            return h + '' + m + '' + s;
        }

        // 移动到指定位置
        // var step = 56;
        function slide(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var objTop = obj.offsetTop;
                var step = (target - objTop) / 30;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                // imgTop = parseInt(imgTop.replace('px', ''))
                if (objTop == target) {
                    clearInterval(obj.timer);
                    callback && callback(obj);
                } else {
                    obj.style.top = step + objTop + 'px';
                }

            }, 20)

        }

        function time() {
            var nowTime = nowTimer();
            var num_timer = setTimeout(function () {
                var futureTime = nowTimer();
                imgChange(nowTime, futureTime)
            }, 1000)

        }

        // 秒钟滑动事件
        function SecondMove() {
            var date = new Date();
            var s = date.getSeconds();
            if (s < 10) {
                if (s == 9) {
                    slide(num_statistics[num_statistics.length - 2].children[0], -61, function (obj) {
                        obj.style.top = '0px';
                        time();
                    })
                    slide(num_statistics[num_statistics.length - 2].children[1], 0, function (obj) {
                        obj.style.top = '61px';
                        time();
                    })

                }
                slide(num_statistics[num_statistics.length - 1].children[1], 0, function (obj) {
                    obj.style.top = '61px';
                    time();
                })
                slide(num_statistics[num_statistics.length - 1].children[0], -61, function (obj) {
                    obj.style.top = '0px';
                    time();
                })

            } else {
                var last = parseInt(String(s).substr(-1))
                var first = parseInt(String(s).charAt(0))
                if (last == 0) {

                    slide(num_statistics[num_statistics.length - 2].children[1], 0, function (obj) {
                        obj.style.top = '61px';
                        time();
                    })
                    slide(num_statistics[num_statistics.length - 2].children[0], -61, function (obj) {
                        obj.style.top = '0px';
                        time();
                    })

                }
                if (first == 0 && last == 0) {
                    slide(num_statistics[num_statistics.length - 3].children[0], -61, function (obj) {
                        obj.style.top = '0px';
                        time();
                    })
                    slide(num_statistics[num_statistics.length - 3].children[1], 0, function (obj) {
                        obj.style.top = '61px';
                        time();
                    })

                }

                slide(num_statistics[num_statistics.length - 1].children[0], -61, function (obj) {
                    obj.style.top = '0px';
                    time();
                })
                slide(num_statistics[num_statistics.length - 1].children[1], 0, function (obj) {
                    obj.style.top = '61px';
                    time();
                })

            }
        }
    }


    scrollFn();

    var header_list = document.querySelectorAll('.header_list');
    var header_login = document.querySelector('.header_login');
    var header_logined = document.querySelector('.header_logined');
    var login_before = document.querySelector('.login_before');
    var login_after = document.querySelector('#login_after');
    var lgsubmit = document.querySelector('.lgsubmit');

    var userName_p = document.querySelector('#userName_p');
    var userPwd_p = document.querySelector('#userPwd_p');

    var user = document.querySelector('#user');
    var login_after_user = document.querySelector('#login_after_user');

    var user_photo = document.querySelector('.user_photo img');
    var user_pic = document.querySelector('.user_pic i img');

    // 索引
    var index = 0;
    // 列表
    var listname = '';
    // 开关
    var flag = false;

    // 登录
    function LoggedIn() {


        $('#userName_p, #userPwd_p').on('keyup', function (e) {
            if (e.keyCode == 13) {
                Login_Judgment();
            }
        })

        lgsubmit.addEventListener('click', function () {
            Login_Judgment();
        })

        // 登录判断
        function Login_Judgment() {
            Login_method_p();
            Login_method_e();

            if (flag) {
                // 弹框
                alert('登录成功');

                SuccessState(index);
            } else {
                alert('登录失败')
            }
        }

        // 登录方式
        function Login_method_p() {
            var local = getData('photoList');
            for (let i = 0; i < local.length; i++) {
                console.log(local[i].pwd_p);
                console.log(userPwd_p.value);
                if (local[i].tel_p == userName_p.value && local[i].pwd_p == userPwd_p.value) {
                    // 登录成功（更改状态为已登录）
                    // localStorage.setItem('status_p', true);
                    local[i].status_p = true;
                    saveData('photoList', local);
                    index = i;
                    listname = 'photoList';
                    flag = true;
                }
            }
        }

        function Login_method_e() {
            var local = getData('emailList');
            for (let i = 0; i < local.length; i++) {
                if (local[i].email_e == userName_p.value && local[i].pwd_e == userPwd_p.value) {
                    // 登录成功（更改状态为已登录）
                    // localStorage.setItem('status_p', true);
                    local[i].status_e = true;
                    saveData('emailList', local);
                    index = i;
                    listname = 'emailList';
                    flag = true;
                }
            }
        }

    }

    LoggedIn();

    // 判断是否登录
    function initLoggedStatus() {
        initLoggedStatus_p();
        initLoggedStatus_e();

        function initLoggedStatus_p() {
            var local = getData('photoList');

            for (let i = 0; i < local.length; i++) {
                if (local[i].status_p) {
                    listname = 'photoList';

                    SuccessState(i)
                }
            }
        }

        function initLoggedStatus_e() {
            var local = getData('emailList');

            for (let i = 0; i < local.length; i++) {
                if (local[i].status_e) {
                    listname = 'emailList';

                    SuccessState(i)
                }
            }
        }
    }
    initLoggedStatus();

    // 成功状态
    function SuccessState(index) {

        // 隐藏
        header_list[0].style.display = 'none';
        header_login.style.display = 'none';
        login_before.style.display = 'none';
        // 显示
        header_list[1].style.display = 'block';
        header_logined.style.display = 'block'
        login_after.style.display = 'block';

        if (listname == 'photoList') {
            SuccessState_p(index);
        } else {
            SuccessState_e(index);
        }

        function SuccessState_p(i) {
            var local = getData('photoList');

            // 用户名称
            user.innerHTML = '用户_' + local[index].tel_p;
            login_after_user.innerHTML = '用户_' + local[index].tel_p;

            // 用户头像
            user_photo.src = './img/iNan_library/' + local[index].header_p;
            user_pic.src = './img/iNan_library/' + local[index].header_p;
        }

        function SuccessState_e(i) {
            var local = getData('emailList');

            // 用户名称
            user.innerHTML = '用户_' + local[index].email_e;
            login_after_user.innerHTML = '用户_' + local[index].email_e;

            // 用户头像
            user_photo.src = './img/iNan_library/' + local[index].header_e;
            user_pic.src = './img/iNan_library/' + local[index].header_e;
        }


    }

    var back = document.querySelector('#back');
    // 退出登录
    function GoBack() {
        back.addEventListener('click', function () {
            // 隐藏
            header_list[1].style.display = 'none';
            header_logined.style.display = 'none'
            login_after.style.display = 'none';
            // 显示
            header_list[0].style.display = 'block';
            header_login.style.display = 'block';
            login_before.style.display = 'block';

            // 初始化
            userName_p.value = '';
            userPwd_p.value = '';

            // 退出登录（更改状态为退出登录）
            var local = getData(listname);
            if (listname == 'photoList') {
                for (let i = 0; i < local.length; i++) {
                    local[i].status_p = false;
                }
            } else {
                for (let i = 0; i < local.length; i++) {
                    local[i].status_e = false;
                }
            }

            saveData(listname, local);

            flag = false;
        })
    }
    GoBack();

    // 保存本地存储数据
    function saveData(List, data) {
        localStorage.setItem(List, JSON.stringify(data));
    }

    // 读取本地存储的数据
    function getData(List) {
        var data = localStorage.getItem(List);
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    var post_Search_hot_as = document.querySelectorAll('.post_Search_hot a');

    // 关键字链接
    function keyword_links() {
        for (let i = 0; i < post_Search_hot_as.length; i++) {
            post_Search_hot_as[i].addEventListener('click', function () {
                window.location.href = './file/search.html?keyword=' + this.innerHTML;
            })
        }
    }

    // 搜索框搜索
    function Search() {
        // 点击搜索
        $('.post_Search_box_btn').on('click', function () {
            if ($('#search_word').val()) {
                window.location.href = './file/search.html?keyword=' + $('#search_word').val();
            } else {
                alert('请输入关键字后再搜索');
            }

        })

        // 回车搜索
        $('#search_word').on('keyup', function (e) {
            if (e.keyCode == 13) {
                $('.post_Search_box_btn').click();
            }
        })
    }

    Search();

    keyword_links();

    var content = document.querySelector('.content');
    var contentTop = content.offsetTop;
    var job_icon = document.querySelector('.job_type_icon');
    var job_box = document.querySelectorAll('.job_type_box');
    var job_as = document.querySelectorAll('.job_type_icon a');
    var job_icon_tab = document.querySelectorAll('.job_type_icon_tab')

    // 电梯导航
    function EleNav() {
        document.addEventListener('scroll', function () {
            IfPosition();
        })

        EleNavClick();
        EleNavTouch();

        // 判断位置
        function IfPosition() {

            // window.pageYOffset 页面被卷去的头部
            // console.log(window.pageYOffset);
            // var windowTop = String(window.pageYOffset);
            // windowTop = windowTop.indexOf(".") > -1 ? Math.floor(parseFloat(window.pageYOffset)) + 1 : Math.floor(parseFloat(window.pageYOffset));
            // console.log(windowTop);
            var windowTop = parseInt(window.pageYOffset) + 1;

            // 当我们页面被卷去的头部大于等于了 content.offsetTop 此时 侧边栏就要改为固定定位
            if (window.pageYOffset >= contentTop) {
                job_icon.style.position = 'fixed';
                job_icon.style.top = '130px';
            } else {
                job_icon.style.position = 'absolute';
                job_icon.style.top = '-30px';
            }

            for (let i = 0; i < job_box.length; i++) {
                if (i < job_box.length - 1) {
                    if (windowTop >= job_box[i].offsetTop + contentTop && windowTop < job_box[i + 1].offsetTop + contentTop) {
                        Ifclaer(i)
                    }
                }
                else {
                    if (windowTop >= job_box[i].offsetTop + contentTop) {
                        Ifclaer(i)
                    }
                }
            }

        }

        // 雪碧图清除操作
        function Ifclaer(i) {
            for (let j = 0; j < job_box.length; j++) {
                job_as[j].style.backgroundPositionX = 0;
            }

            job_as[i].style.backgroundPositionX = '-60px';
        }

        // 电梯点击事件
        function EleNavClick() {
            for (let i = 0; i < job_as.length; i++) {
                job_as[i].addEventListener('click', function () {
                    // job_box[i].scrollIntoView(true)
                    animate(window, job_box[i].offsetTop + contentTop + 2);
                })
            }
            IfPosition();

        }

        // 电梯触碰事件
        function EleNavTouch() {
            for (let i = 0; i < job_as.length; i++) {
                job_as[i].addEventListener('mouseover', function () {
                    job_as[i].style.backgroundPositionX = '-60px';
                    job_icon_tab[i].style.display = 'block';
                })
                job_as[i].addEventListener('mouseout', function () {
                    job_as[i].style.backgroundPositionX = 0;
                    job_icon_tab[i].style.display = 'none';
                    IfPosition()
                })
            }
        }
    }

    EleNav();

    var collected = document.querySelector("#collected");
    var other_lis = document.querySelectorAll(".other_href_content li");

    // 友情链接
    function FriendlyLink() {
        // 节流阀（开关）
        var flag = false;

        collected.addEventListener('click', function () {
            if (flag) {
                for (let i = 0; i < other_lis.length; i++) {
                    other_lis[i].style.height = '30px'
                }
                this.innerHTML = '收起∧'
                flag = false;
            } else {
                for (let i = 0; i < other_lis.length; i++) {
                    other_lis[i].style.height = 0
                }
                this.innerHTML = '展开∨'
                flag = true;
            }
        })
    }

    FriendlyLink();

    var float_bs = document.querySelector('.float_bs');
    var bottom_block = document.querySelector('.bottom_block');
    var bottom_close = document.querySelector('.bottom_close');

    // 底部广告
    function Infomercial() {
        TopMove(float_bs, 70, setTimeout(function () {
            TopMove(float_bs, 0);
            LeftMove(bottom_block, 0);
        }, 2600));

        bottom_block.addEventListener('click', function () {
            LeftMove(bottom_block, -219);
            TopMove(float_bs, 70);
        })

        bottom_close.addEventListener('click', function () {
            TopMove(float_bs, 0);
            LeftMove(bottom_block, 0);
        })

        // 向上或者向下移动
        function TopMove(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var objTop = Math.abs(obj.offsetTop)
                var step = (target - objTop) / 40;  //7
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetTop == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    callback && callback();
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式：（目标值 - 现在的位置）/ 10
                obj.style.bottom = objTop + step + 'px'
            }, 20);
        }

        // 向左或向右移动
        function LeftMove(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                // var objLeft = Math.abs(obj.offsetLeft)
                var step = (target - obj.offsetLeft) / 40;  //7
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    callback && callback();
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式：（目标值 - 现在的位置）/ 10
                obj.style.left = obj.offsetLeft + step + 'px'
            }, 20);
        }
    }

    Infomercial();


    var lis = document.querySelectorAll(".float_right li");

    // 工具栏
    function toolbar() {
        for (let i = 0; i < lis.length; i++) {
            // lis[i].children[1]
            lis[i].addEventListener("mouseover", function () {
                this.children[1].classList.remove('dis-no')
            })
            lis[i].addEventListener("mouseout", function () {
                this.children[1].classList.add('dis-no')
            })
        }

        // 返回顶部
        function goBack() {
            lis[2].addEventListener("click", function () {
                // 因为是窗口滚动 所以对象是window
                // window.scroll(0, 0);
                animate(window, 0);
            })
        }

        goBack();
    }

    toolbar();

})