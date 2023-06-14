window.addEventListener('load', function () {
    var code = document.querySelector('.reg_yzm_num');
    var refresh = document.querySelector('.reg_yzm_resh');

    // 点击刷新验证码
    refresh.addEventListener('click', function () {
        createCode();
    })

    // 验证码
    function createCode() {
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

    createCode();

    var as = document.querySelectorAll('.reg_title a');
    var box_main = document.querySelectorAll('.reg_main_content_box_main');
    var icon_phone = document.querySelector('.reg_title_icon_phone');
    var icon_email = document.querySelector('.reg_title_icon_email');
    var border_box = document.querySelector('#border_box');
    var accept_icon = document.querySelectorAll('.accept_box_icon');
    var inputAll = document.querySelectorAll('input');

    // 判断是否接受协议
    var flag = false;

    // 点击切换
    function ClickChange() {

        for (let i = 0; i < as.length; i++) {
            as[i].addEventListener('click', function () {
                for (let j = 0; j < box_main.length; j++) {
                    as[j].className = ''
                    box_main[j].style.display = 'none';
                }
                ClearUp();
                this.className = 'reg_title_active'
                box_main[i].style.display = 'block';

                if (i == 0) {
                    border_box.className = 'border_box_phone'

                    icon_phone.classList.add('phone_on');
                    icon_email.classList.remove('email_on');
                } else {
                    border_box.className = 'border_box_email'

                    icon_email.classList.add('email_on');
                    icon_phone.classList.remove('phone_on');
                }
            })
        }

        // 接受协议
        function AcceptAgreement() {


            for (let i = 0; i < accept_icon.length; i++) {
                accept_icon[i].addEventListener('click', function () {
                    if (flag) {
                        this.style.background = 'url(../img/register/box.png) no-repeat center';
                        flag = false;
                    } else {
                        this.style.background = 'url(../img/register/box_1.png) no-repeat center';
                        flag = true;
                    }

                })
            }
        }

        AcceptAgreement();

    }

    // 清除
    function ClearUp() {
        var main_p = document.querySelectorAll('.reg_main_content_box_main p');

        for (let j = 0; j < main_p.length; j++) {
            main_p[j].style.display = 'none';
        }

        var photo_show = document.querySelector('#user_photo_show_img_p');
        var email_show = document.querySelector('#user_photo_show_img_e');

        photo_show.src = '../img/register/user_photo.png';
        email_show.src = '../img/register/user_photo.png';

        for (let i = 0; i < inputAll.length; i++) {
            inputAll[i].value = '';
        }

        for (let z = 0; z < accept_icon.length; z++) {
            accept_icon[z].style.background = 'url(../img/register/box.png) no-repeat center'
        }

    }

    ClickChange();


    var accept_span = document.querySelectorAll('.accept_box span');
    var close_box = document.querySelector('.close_box');
    var user_agree = document.querySelector('.user_agree');

    // 服务协议
    function ServiceAgreement() {
        for (let i = 0; i < accept_span.length; i++) {
            accept_span[i].addEventListener('click', function () {
                user_agree.style.display = 'block';
            })
        }

        close_box.addEventListener('click', function () {
            user_agree.style.display = 'none';
        })
    }

    ServiceAgreement();

    var regtel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; // 手机号码的正则表达式
    var regpwd = /^[a-zA-Z0-9_-]{6,12}$/;  // 密码的正则表达式
    var regemail = /^[a-zA-Z0-9]+([-_.][A-Za-z]+)*@([a-zA-Z0-9]+[-.])+[A-Za-z]{3,5}$/;  // 邮箱编码的正则表达式
    var user_p = document.querySelector('#user_p');
    var pwd_p = document.querySelector('#pwd_p');
    var user_e = document.querySelector('#user_e');
    var pwd_e = document.querySelector('#pwd_e');

    var reg_p_user;
    var reg_p_pwd;
    var reg_e_email;
    var reg_e_pwd;

    // 判断手机号码和邮箱是否重复
    var repeat;

    regexp(user_p, regtel); // 手机号码
    regexp(pwd_p, regpwd); // 密码框
    regexp(user_e, regemail); // qq邮箱
    regexp(pwd_e, regpwd);

    // 判断手机号和密码是否符合规范,文字提示
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value.trim())) {
                this.nextElementSibling.style.display = 'none';

                if (this == user_p) {
                    IfRepeat(this, 'photoList');
                    if (!repeat) {
                        this.nextElementSibling.nextElementSibling.style.display = 'none';
                    } else {
                        this.nextElementSibling.nextElementSibling.style.display = 'block';
                    }
                }
                if (this == user_e) {
                    IfRepeat(this, 'emailList');
                    if (!repeat) {
                        this.nextElementSibling.nextElementSibling.style.display = 'none';
                    } else {
                        this.nextElementSibling.nextElementSibling.style.display = 'block';
                    }
                }

            } else {
                this.nextElementSibling.nextElementSibling.style.display = 'none';
                this.nextElementSibling.style.display = 'block';
            }
        }
    }

    function IfRepeat(ele, List) {
        repeat = false;
        // 先读去本地存储原来的数据
        var local = getData(List);
        // // console.log(local);
        if (local.length != 0) {
            for (let i = 0; i < local.length; i++) {
                if (ele.value == Object.values(local[i])[0]) {
                    repeat = true;
                }

            }
        }

    }

    // 判断手机号和密码是否符合规范
    function regexp_phone() {
        if (regtel.test(user_p.value.trim())) {
            reg_p_user = true;
        } else {
            alert('非法的电话格式');
        }

        if (regpwd.test(pwd_p.value.trim())) {
            reg_p_pwd = true;
        } else {
            alert('请设置6-12位密码');
        }
    }

    // 判断邮箱和密码是否符合规范
    function regexp_email() {
        if (regemail.test(user_e.value.trim())) {
            reg_e_email = true;
        } else {
            alert('非法的邮箱格式');
        }

        if (regpwd.test(pwd_e.value.trim())) {
            reg_e_pwd = true;
        } else {
            alert('请设置6-12位密码');
        }
    }


    // 验证码
    var figure_yzm;

    // 判断验证码是否正确
    function validate() {
        var yzm_value = document.querySelector('#yzm_input').value.toUpperCase();

        if (yzm_value.length == 0) {
            alert('请输入图形验证码');
        } else if (yzm_value != code.innerHTML) {
            alert('图形验证码不正确，请重新输入');
            yzm_value = '';
            createCode();
        } else {
            figure_yzm = true;
        }
    }

    var reg_yzm_btn = document.querySelector('.reg_yzm_btn');
    var second = 30;

    // 获取验证码
    function getCode() {
        reg_yzm_btn.addEventListener('click', function () {
            if (reg_yzm_btn.click) {
                phoneCode();
                var yzm_time = setInterval(function () {
                    reg_yzm_btn.style.backgroundColor = "#888888";
                    if (second == 0) {
                        reg_yzm_btn.click = true;
                        reg_yzm_btn.style.backgroundColor = "#0AA5F5";
                        reg_yzm_btn.innerHTML = "获取验证码";
                        second = 30;
                        clearInterval(yzm_time);
                    } else {
                        reg_yzm_btn.click = false;
                        second--;
                        reg_yzm_btn.innerHTML = second + " 秒后重发";
                    }
                }, 1000)
            }
        })

    }

    getCode();


    var phone_code = ''

    // 生成短信验证码
    function phoneCode() {
        codeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'R', 'W', 'X', 'Y', 'Z'];

        phone_code = ''

        for (var i = 0; i < 6; i++) {
            num = Math.floor(Math.random() * 36);
            phone_code += codeList[num];
        }

        var short_message = '【易工作】您正在短信登录，验证码 ' + phone_code + ' ，请在30秒内按页面提示验证码，切勿将验证码泄露于他人';
        alert(short_message);

    }

    var phone_yzm;

    // 判断短信验证码是否正确
    function photo_validate() {
        var yzm_value = document.querySelector('#photo_yzm_input').value.toUpperCase();

        if (yzm_value.length == 0) {
            alert('请输入短信验证码');
            return false;
        } else if (yzm_value.trim() != phone_code) {
            alert('短信验证码不正确，请重新输入');
            yzm_value = '';
            return false;
        } else {
            phone_yzm = true;
        }
    }

    // 手机注册
    var photo_show = document.querySelectorAll('.user_photo_show img');
    var user_photo_src = document.querySelectorAll('.user_photo_box button');

    // 用户头像浏览
    function user_photo_show() {

        // input.addEventListener('change', function () {
        //     const file = this.files[0];
        //     const filePath = window.URL.createObjectURL(file);
        //     show.src = filePath;
        // })

        for (let i = 0; i < user_photo_src.length; i++) {
            user_photo_src[i].addEventListener('click', function () {
                num = Math.floor(Math.random() * 14 + 1);

                photo_show[i].src = '../img/iNan_library/' + num + '.png';

                getPath(0);
            })
        }


    }

    user_photo_show();

    // 图片格式
    // function picture_format(input) {
    //     if (input) {
    //         if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(input.value)) {
    //             alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
    //             return false;
    //         }
    //     } else {
    //         input = "../img/register/user_photo.png";
    //     }
    // }

    // 获取图片路径
    function getPath(index) {
        let path = photo_show[index].src;

        path = path.split('/');
        path = path[path.length - 1];

        return path;
    }

    // 手机号注册
    var reg_btn_phone = document.querySelector('#reg_btn_phone');
    reg_btn_phone.addEventListener('click', function () {

        // 判断手机号和密码是否符合规范
        regexp_phone();
        // 判断图形验证码是否正确
        validate();
        // 判断短信验证码是否正确
        photo_validate();
        // 图片格式
        // picture_format(user_photo_src_p.value);
        // 获取图片路径
        let header_p = getPath(0);

        // 接受协议
        if (flag) {
            if (reg_p_user && reg_p_pwd && figure_yzm && phone_yzm) {
                if (!repeat) {
                    var local = getData('photoList');
                    local.push({ tel_p: user_p.value, pwd_p: pwd_p.value, header_p: header_p, status_p: false });
                    savaData('photoList', local);

                    alert('注册成功!');
                    ClearUp();
                    // window.history.go(-1);
                    window.location.href = '../index.html'
                } else {
                    alert('该号码已被注册');
                }

            }
        } else {
            alert('请先同意用户协议！');
        }

    });



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

    // 保存本地存储数据
    function savaData(List, data) {
        localStorage.setItem(List, JSON.stringify(data));
    }


    // 邮箱注册
    var reg_btn_email = document.querySelector('#reg_btn_email');
    reg_btn_email.addEventListener('click', function () {

        // 判断邮箱和密码是否符合规范
        regexp_email();
        // 图片格式
        // picture_format(user_photo_src_e.value);
        // 获取图片路径
        let header_e = getPath(1);
        console.log(header_e);

        // 接受协议
        if (flag) {
            if (reg_e_email && reg_e_pwd) {
                if (!repeat) {
                    var local = getData('emailList');
                    local.push({ email_e: user_e.value, pwd_e: pwd_e.value, header_e: header_e, status_e: false });
                    savaData('emailList', local);

                    alert('注册成功!');
                    ClearUp();
                    window.history.go(-1);
                } else {
                    alert('该号码已被注册');
                }
                window.location.href = '../index.html'
            }
        } else {
            alert('请先同意用户协议！');
        }
    })
})