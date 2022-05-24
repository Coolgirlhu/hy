class Problem {
    // 构造方法 实例化类自动调用
    constructor() {
            this.getData();
            // 获取保存按钮  绑定点击事件
            this.$('.save-data').addEventListener('click', this.saveDate)
        }
        // 获取数据方法
    getData() {
            // console.log('获取数据');
            // 获取tbody   只有一个获取单个节点
            // let tbody = this.$('tbody')
            // console.log(tbody);
            // 页面有多个  返回节点结合
            // let div = this.$('div');
            // console.log(div);

            // 发送Ajax请求  获取数据
            // 为给定 ID 的 user 创建请求
            axios.get('http://localhost:3000/problem').then(res => {
                console.log(res);
                // 获取返回值中的 data 和 status
                let { data, status } = res;
                // console.log(data, status);
                // 判断状态为200请求成功
                if (status == 200) {
                    // console.log(data);
                    // 将获取的数据渲染到页面中
                    let html = '';
                    data.forEach(ele => {
                        // console.log(ele);
                        html += `<tr>
                    <th scope="row">${ele.id}</th>
                    <td>${ele.title}</td>
                    <td>${ele.pos}</td>
                    <td>${ele.idea}</td>
                    <td>删除/操作</td>
                </tr>`;
                    });
                    // console.log(html);
                    // 将拼接的tr追加到页面
                    this.$('.table tbody').innerHTML = html
                }
            })
        }
        // 保存数据的方法
    saveDate() {
        // console.log(this);
        // 获取添加表单中的内容
        let form = document.forms[0].elements;
        // console.log(form);
        let title = form.title.value.trim();
        let pos = form.pos.value.trim();
        let idea = form.idea.value.trim();
        // console.log(title, pos, idea);
        // 判断表单中每一项是否有值,如果为空 则提示
        if (!title || !pos || !idea) {
            throw new Error('表单不能为空')
        }
        // 将数据通过Ajax 发送给json-server服务器  进行保存数据
        //JSON-server  中 post请求添加数据到服务器中
        axios.post('http://localhost:3000/problem', {
            title,
            pos,
            idea
        }).then(res => {
            // console.log(res);
            // 如果添加成功则刷新页面
            if (res.status == 201) {
                location.reload()
            }
        })

    }


    // 获取节点方法  封装为一个函数  直接调用   方便多次获取节点
    $(ele) {
        let res = document.querySelectorAll(ele);
        // 判断当前页面只有一个符合条件就返回单个节点对象,否则返回节点集合
        return res.length == 1 ? res[0] : res;
    }
}
new Problem;