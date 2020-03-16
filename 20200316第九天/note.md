> 云开发

# 记录中的_openid
* 注意，_openid不用显式去添加。如果是用户对数据库进行的写操作，则记录会自带一个_openid(即唯一记录)。
* 但如果是管理员直接在gui上进行添加操作，则不会创建_openid.



## fileID
* fileID是云数据库和云存储的关系枢纽，无论是上传文件，还是下载文件吗还是说其它的数据库操作，都会有对应的fileID返回。那么如何利用这个fileID变得至关重要。


##  数据库记录的数组内操作
* 由于小程序数据库不是关系型数据库，所以里面有类似数组或者对象等数据结构的表达模式。
* **有时候我们需要的是对记录内部进行操作，而不是对整个数据记录操作。**
```js
addFiles(fileID) {
    const name = this.data.files[0].name
    const _id= this.data.userData.data[0]._id
    db.collection('clouddisk').doc(_id).update({
      data: {
        'folders.0.files': _.push({ //实际取的数据是 folders[0].files 
          "name":name,
          "fileID":fileID
        })
      }
    }).then(result => {
      console.log("写入成功", result)
      wx.navigateBack()
    }
    )
}

//或者这样操作å
// 方式一
db.collection('todos').where({
  style: { //写成字面量模式
    color: 'red'
  }
}).get()
 
// 方式二
db.collection('todos').where({
  'style.color': 'red' //写成 . 引用模式
}).get()

```


## 对于第六天的“不能上传多个文件”做一个修正
* 在客户端是无法进行多个文件上传的，但是如果是在服务端上 -> 即云函数上是可以实现多文件上传的。
[可以参考文件](https://tencentcloudbase.github.io/handbook/tcb24.html)