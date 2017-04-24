## git学习总结
### SVN与Git的区别
- SVN是集中式版本控制系统，版本库是集中放在中央服务器的，而干活的时候，用的都是自己的电脑，所以首先要从中央服务器哪里得到最新的版本，然后干活，干完后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，如果在局域网还可以，带宽够大，速度够快，如果在互联网下，如果网速慢的话，就纳闷了。

- Git是分布式版本控制系统，那么它就没有中央服务器的，每个人的电脑就是一个完整的版本库，这样，工作的时候就不需要联网了，因为版本都是在自己的电脑上。既然每个人的电脑都有一个完整的版本库，那多个人如何协作呢？比如说自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

### 本地环境配置github(要有github账号)
#### 1. 配置账号信息
因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。
```
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
**注意：** `git config` 命令的 `--global` 参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```
//可以通过以下命令查看设置情况
git config --global user.name
git config --global user.email
```
#### 2. 创建本地ssh(用于上传到你对应的github账号)
```
ssh-keygen -t rsa -C "email@example.com"
```
接下来会让你输入保存路径，你可以选择默认，也可以选择保存到对应位置，最后会让你输入密码， 密码也是可有可无的。
#### 3. 接下来就是找到创建.ssh文件夹，打开id_rsa.pub，复制内容，登陆github，选择Settings –>SSH and GPG kyes –>New SSH Key –>Add SSH Key
![图解]()
#### 4. 验证
```
ssh -T git@github.com
```
会出现询问你继续连接，输入yes，然后弹框输入2中你设置的密码， 然后出现如下信息说明配置成功
```
Hi "Your Name"! You've successfully authenticated, but GitHub does not provide shell access.
```

### 把文件添加到版本库中
1. 使用 git add 命令将文件添加到暂存区中
2. 使用 git commit告诉Git，把文件提交到版本库
**注意：**
- 可以使用 `git status` 命令可以随时掌握仓库当前的状态
- `git diff` 命令可以查看对文件做了哪些修改

### 版本回退
1. 使用git log命令显示从最近到最远的显示日志

### 创建与合并分支
```
//创建并切换到dev分支
git checkout -b dev
//相当于一下两条命令
git branch dev //创建dev分支
git checkout dev //切换到dev分支
git branch //查看当前所有的分支
git merge master //将分支合并到master分支上
git branch –d name //删除分支
```
### 变基(git rebase)
和合并merge相似的效果都是合并分支, 但是使用变基rebase可以让提交历史变得更简洁。

### Git基本常用命令
#### 创建版本库
- mkdir (创建一个文件夹)
- pwd：显示当前目录的路径
- git init：把当前的目录变成可以管理的git仓库，生成隐藏.git文件
#### 版本回退
- git add：把文件添加到暂存区中
- git commit -m “XX”：提交文件，–m 后面的是注释。
- git status：查看仓库状态
- git diff  XX：查看XX文件修改了那些内容
- git log：查看历史记录
- git reset  --hard HEAD^ 或者 git reset  --hard HEAD~ 回退到上一个版本。(如果想回退到100个版本，使用git reset --hard HEAD~100 )
- cat XX：查看XX文件内容
- git reflog：查看历史记录的版本号id
- git checkout --XX：把XX文件在工作区的修改全部撤销。
- git rm XX：删除XX文件
#### 关联远程仓库
- git remote add origin 远程仓库地址：关联一个远程库
- git push –u(第一次要用-u 以后不需要) origin master：把当前master分支推送到远程库
- git clone 远程仓库地址：从远程库中克隆
#### 分支管理
- git checkout –b dev：创建dev分支并切换到dev分支上
- git branch：查看当前所有的分支
- git checkout master：切换回master分支
- git merge dev：在当前的分支上合并dev分支
- git branch –d dev：删除dev分支
- git branch name：创建分支
- git stash：把当前的工作隐藏起来 等以后恢复现场后继续工作
- git stash list：查看所有被隐藏的文件列表
- git stash apply：恢复被隐藏的文件，但是内容不删除
- git stash drop：删除文件
- git stash pop：恢复文件的同时 也删除文件
- git remote：查看远程库的信息
- git remote –v：查看远程库的详细信息
- git push origin master：Git会把master分支推送到远程库对应的远程分支上
### 参考博文
[推荐！手把手教你使用Git](http://blog.jobbole.com/78960/)
[SVN、GIT日常看我就够了](http://blog.jobbole.com/108834/?utm_source=blog.jobbole.com&utm_medium=relatedPosts)
