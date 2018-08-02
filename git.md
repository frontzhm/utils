git

## 版本控制系统vcs

Git 是一个分布式版本控制系统(Distributed Version Control System - DVCS）。

版本控制系统（VCS）最基本的功能是版本控制。所谓版本控制，意思就是在文件的修改历程中保留修改历史，让你可以方便地撤销之前对文件的修改操作。编辑撤销的升级版。

与撤销不同的是，VCS 保存修改历史，使用的是主动提交改动的机制。也就是你觉得这次修改很重要就提交，以方便日后退回到这个版本。

多人合作需要同步代码就需要中央仓库。

> 版本控制、主动提交、中央仓库这三个要素，共同构成了版本控制系统（VCS）的核心：开发团队中的每个人向中央仓库主动提交自己的改动和同步别人的改动，并在需要的时候查看和操作历史版本，这就是版本控制系统。

中央式版本控制系统的工作模型：在服务器上搭建一个中央仓库，每个人并行开发独立的功能，可随时同步。这个中央仓库的主要功能就是*保存版本历史，同步团队代码*。
分布式版本控制系统除了中央仓库外还有本地仓库，于是中央仓库的功能主要是同步团队代码。版本历史就放在本地了。
其工作模型：服务器上搭建一个中央仓库，代码提交到本地仓库，然后推送到中央仓库。队友克隆中央仓库，且有了各自的本地仓库。各自代码变动的时候提交到本地仓库即可，某个功能完成之后可以推送到中央仓库。

分布式的优点脱离网络，更细致的提交。缺点是存储大。
> 对于一般的程序项目而言，由于项目的大多数内容都是文本形式的代码，所以工程的体积都并不是很大，再加上文本内容自身的特点，VCS 可以利用算法来把仓库的体积极大地压缩。这就导致，在实际中，Git 等分布式 VCS 的仓库体积并不大，初次获取项目的耗时和本地仓库的存储占用都很小。所以对于大多数的程序项目而言，分布式 VCS 「尺寸大、初次下载慢」的问题其实并不严重。不过也有一些例外，比如游戏开发。游戏的开发中有大量的大尺寸数据和媒体文件，并且这些文件的格式也不容易压缩尺寸，如果用分布式 VCS 会导致仓库的体积非常庞大。所以一些大型游戏的开发会选择中央式的 VCS 来管理代码。...

## 上手git

1. 安装
1. 练习。先去github点击右上角的「New Repository」来新建远程仓库，进入仓库设置页面填写信息，之后点击右边的「Clone or download」，然后把仓库的 clone 地址复制到剪贴板
1. 在 Terminal 或 cmd 中切换到你希望放置项目的目录中，然后输`git clone 地址`，需要用户名和密码，之后就发现除了你刚才添加的 LICENSE 和 .gitignore 文件外，还有一个叫做 .git 的隐藏目录。这个 .git 目录，就是你的本地仓库（Local Repository），你的所有版本信息都会存在这里。而 .git 所在的这个根目录，称为 Git 的工作目录（Working Directory），它保存了你当前从仓库中签出（checkout）的内容。
1. 现在你在项目的目录下输入`git log`, 出现下面

```
commit 5f94f9fa73b6a15aed31a8f8d6b72e65aa9f8db9 (HEAD -> master, origin/master, origin/HEAD)
Author: m <m@mdeMacBook-Pro.local>
Date:   Tue Jul 24 14:38:08 2018 +0800

    initial commit
```

commit 右边的那一大串字符（5f94f9fa7。。），是这个 commit 的 SHA-1 校验和（如果不知道什么是 SHA-1，你可以暂时把它简单理解为这个 commit 的 ID）；后面括号里的内容（HEAD -> master ...）稍后再讲；第一行的下面，依次是这个 commit 的作者、提交日期和提交信息，其中提交信息记录了这个提交做了什么，是提交者填写的（当然，这条提交信息是 GitHub 帮你写的）。...
1. 写个文件，先 `git status`,status 是用来查看工作目录当前状态的指令：
```
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	shopping list.txt

nothing added to commit but untracked files present (use "git add" to track)
```
    你在 master branch
    当前 branch 没有落后于 origin/master
    你有 untracked files （未追踪的文件），文件名是 shopping list.txt。
    你可以使用 git add 来开始追踪文件。...
1. 从上面的信息可以看出，shopping list.txt 这个文件目前属于 "untracked" 状态，它的意思是 Git 仓库对它没有进行任何记录，你在提交的时候不会把它提交上去，查看提交历史也不会看到它。总之，对于 Git 仓库来说，它是不存在的。而你现在想提交这个文件，所以首先，你需要用 add 指令来让 Git 开始跟踪它：`git add shopping\ list.txt`输入这行代码，Terminal 不会给你反馈信息。但这时你再执行一次 git status，你会发现显示内容变了：
    ```
    Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   mlayer/mlayer.es3.js
```
可以看到，shopping list.txt 的文字变成了绿色，它的前面多了「new file:」的标记，而它的描述也从 "Untracked files" 变成了 "Changes to be commited"。这些都说明一点：shopping list.txt 这个文件的状态从 "untracked"（未跟踪）变成了 "staged"（已暂存），意思是这个文件中被改动的部分（也就是这整个文件啦）被记录进了 staging area（暂存区）...
 stage 这个词在 Git 里，是「集中收集改动以待提交」的意思；而 staging area ，就是一个「汇集待提交的文件改动的地方」。简称「暂存」和「暂存区」。至于 staged 表示「已暂存」，就不用再解释了吧？
 > 所谓的 staging area，是 .git 目录下一个叫做 index 的文件（嗯，它的文件名并不叫 stage ）。你通过 add 指令暂存的内容，都会被写进这个文件里。

1. 现在文件已经放进了暂存区，就可以提交了。提交的方式是用 commit 指令：`git commit`,进入这样一个界面,在初始状态下，你是在命令模式，不能编辑这个文件，你需要按一下 "i"（小写）来切换到插入模式，然后就可以输入你的提交信息了.在输入完成后别按回车，而是要按 ESC 键返回到命令模式，然后连续输入两个大写的 "Z"（用 Shift 键或 Capslock 键都可以），就保存并退出了。

1. `git log`就可以看见刚提交的历史了。这说明，你已经成功做了一次提交到本地仓库，它已经被保存在了 .git 这个目录里的某个地方了。

1. 再修改文件，`git status`，可以看到，shopping list.txt 又变红了，不过这次它左边的文字不是 "New file:" 而是 "modified:"，而且上方显示它的状态也不是 "Untracked" 而是 "not staged for commit"，意思很明确：Git 已经认识这个文件了，它不是个新文件，但它有了一些改动。所以虽然状态的显示有点不同，但处理方式还是一样的：`git add shopping list.txt`
1. 这时再 status 一下，就会看到 shopping list.txt 已经 staged ("to be commited") 了，再commit，再log，再status，你会看到，Git 提示你的当前 branch 已经领先于（ "ahead of" ）'origin/master' 两个提交了。就像上面我说的，branch 这个概念我到后面再讲，origin/master 的中的 origin 是远端仓库的名称，是你在用 clone 指令初始化本地仓库时 Git 自动帮你起的默认名称；master 是 origin 上的分支名称。不过对于现在来说，可以暂时把 origin/master 简单理解为「中央仓库」。也就是说，这句话是告诉你，你的本地仓库已经领先中央仓库两个提交了。这两个提交很明显就是指的刚才那两个关于 shopping list.txt 的提交。`git push`即可

在这一节里，描述了 Git 的最基本的工作模型：
> 
> 从 GitHub 把中央仓库 clone 到本地（使用命令： git clone）
> 把写完的代码提交（先用 git add 文件名 把文件添加到暂存区，再用 git commit 提交）
> 在这个过程中，可以使用 git status 来随时查看工作目录的状态
> 每个文件有 "changed / unstaged"（已修改）, "staged"（已修改并暂存）, "commited"（已提交） 三种状态，以及一种特殊状态 "untracked"（未跟踪）
> 提交一次或多次之后，把本地提交 push 到中央仓库（git push）...

push为什么会失败？

因为 Git 的push 其实是用本地仓库的 commits 记录去覆盖远端仓库的 commits 记录（注：这是简化概念后的说法，push 的实质和这个说法略有不同），而如果在远端仓库含有本地没有的 commits 的时候，push （如果成功）将会导致远端的 commits 被擦掉。这种结果当然是不可行的，因此 Git 会在 push 的时候进行检查，如果出现这样的情况，push 就会失败。...


> 写完所有的 commit 后，不用考虑中央仓库是否有新的提交，直接 push 就好
> 如果 push 失败，就用 pull 把本地仓库的提交和中央仓库的提交进行合并，然后再 push 一次


## header  origin master
第一行的 commit 后面括号里的 HEAD -> master, origin/master, origin/HEAD ，是几个指向这个 commit 的引用。在 Git 的使用中，经常会需要对指定的 commit 进行操作。每一个 commit 都有一个它唯一的指定方式——它的 SHA-1 校验和，也就是上图中每个黄色的 commit 右边的那一长串字符。两个 SHA-1 值的重复概率极低，所以你可以使用这个 SHA-1 值来指代 commit，也可以只使用它的前几位来指代它（例如第一个 78bb0ab7d541…16b77，你使用 78bb0ab 甚至 78bb 来指代它通常也可以），但毕竟这种没有任何含义的字符串是很难记忆的，所以 Git 提供了「引用」的机制：使用固定的字符串作为引用，指向某个 commit，作为操作 commit 时的快捷方式。...

HEAD：当前 commit 的引用。
每次当有新的 commit 的时候，工作目录自动与最新的 commit 对应；而与此同时，HEAD 也会转而指向最新的 commit。事实上，当使用 checkout、reset 等指令手动指定改变当前 commit 的时候，HEAD 也会一起跟过去。

总之，当前 commit 在哪里，HEAD 就在哪里，这是一个永远自动指向当前 commit 的引用，所以你永远可以用 HEAD 来操作当前 commit。...

### branch

HEAD 是 Git 中一个独特的引用，它是唯一的。而除了 HEAD 之外，Git 还有一种引用，叫做 branch（分支）。HEAD 除了可以指向 commit，还可以指向一个 branch，当它指向某个 branch 的时候，会通过这个 branch 来间接地指向某个 commit；另外，当 HEAD 在提交时自动向前移动的时候，它会像一个拖钩一样带着它所指向的 branch 一起移动。...
最新的 commit （提交信息："Add feature1"）被创建后，HEAD 和 master 这两个引用都指向了它，而在上面第一张图中的后两个引用 origin/master 和 origin/HEAD 则依然停留在原先的位置。

### master

1. 新创建的 repository（仓库）是没有任何 commit 的。但在它创建第一个 commit 时，会把 master 指向它，并把 HEAD 指向 master。
1. 当有人使用 git clone 时，除了从远程仓库把 .git 这个仓库目录下载到工作目录中，还会 checkout （签出） master（checkout 的意思就是把某个 commit 作为当前 commit，把 HEAD 移动过去，并把工作目录的文件内容替换成这个 commit 所对应的内容）。...
1. 尽管在 Git 中，branch 只是一个指向 commit 的引用，但它有一个更通俗的理解：你还可以把一个 branch 理解为从初始 commit 到 branch 所指向的 commit 之间的所有 commits 的一个「串」
怎么理解 branch 是个个人偏好的问题，这两种理解方式你选一个喜欢的就好。

## 分支

某处创建 branch ，只需要输入一行 `git branch 名称`
不过新建的 branch 并不会自动切换,`git checkout feature1`
`git checkout -b 名称`这行代码可以帮你用指定的名称创建 branch 后，再直接切换过去。
切换到新的 branch 后，再次 commit 时 HEAD 就会带着新的 branch 移动了
再切换到 master 去 commit，就会真正地出现分叉了

除 branch 的方法非常简单：git branch -d 名称
出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（因为怕你误删掉「未完成」的 branch 啊）-D
Git 中的 HEAD 和每一个 branch 以及其他的引用，都是以文本文件的形式存储在本地仓库 .git 目录中，而 Git 在工作的时候，就是通过这些文本文件的内容来判断这些所谓的「引用」是指向谁的。

> HEAD 是指向当前 commit 的引用，它具有唯一性，每个仓库中只有一个 HEAD。在每次提交时它都会自动向前移动到最新的 commit 。当前 commit 是用户自己选择的，可以是任意一个commit，也就是当选择任意一个commit的时候，head自动指向当前的commit.一旦commit，head就会指向最新的commit

> branch 是一类引用。HEAD 除了直接指向 commit，也可以通过指向某个 branch 来间接指向 commit。当 HEAD 指向一个 branch 时，commit 发生时，HEAD 会带着它所指向的 branch 一起移动。
master 是 Git 中的默认 branch，它和其它 branch 的区别在于：
新建的仓库中的第一个 commit 会被 master 自动指向；
在 git clone 时，会自动 checkout 出 master。
branch 的创建、切换和删除：
创建 branch 的方式是 git branch 名称 或 git checkout -b 名称（创建后自动切换）；
切换的方式是 git checkout 名称；
删除的方式是 git branch -d 名称。...

新建分支其实就是创建某个commit的引用 
checkout是让这个引用变成当前commit，而head就是当前commit的引用，所以head也会相应变化。
branch的特殊之处在于提交之后，有另外的路。
每次commit，head指向最新的commit，带着分支。也就是head和分支的引用都被改变到最新的commit。



‘push 做的事是：把当前 branch 的位置（即它指向哪个 commit）上传到远端仓库，并把它的路径上的 commits 一并上传。
这里的 git push 和之前有点不同：多了 origin feature1 这两个参数。其中 origin 是远程仓库的别名，是你在 git clone 的时候 Git 自动帮你起的；feature1 是远程仓库中目标 branch 的名字。这两个参数合起来指定了你要 push 到的目标仓库和目标分支，意思是「我要 push 到 origin 这个仓库的 feature1 分支」。

在 Git 中（2.0 及它之后的版本），默认情况下，你用不加参数的 git push 只能上传那些之前从远端 clone 下来或者 pull 下来的分支，而如果需要 push 你本地的自己创建的分支，则需要手动指定目标仓库和目标分支（并且目标分支的名称必须和本地分支完全相同），就像上面这样。

你可以通过 git config 指令来设置 push.default 的值来改变 push 的行为逻辑，例如可以设置为「所有分支都可以用 git push 来直接 push，目标自动指向 origin 仓库的同名分支」（对应的 push.default 值：current），或者别的什么行为逻辑，你甚至可以设置为每次执行 git push 时就自动把所有本地分支全部同步到远程仓库（虽然这可能有点耗时和危险）。如果希望详细了解，你可以到这里看看。...

细心的人可能会发现，在 feature1 被 push 时，远程仓库的 HEAD 并没有和本地仓库的 HEAD 一样指向 feature1。这是因为，push 的时候只会上传当前的 branch 的指向，并不会把本地的 HEAD 的指向也一起上传到远程仓库。事实上，远程仓库的 HEAD 是永远指向它的默认分支（即 master，如果不修改它的名称的话），并会随着默认分支的移动而移动的。...


###
 
 push 是把当前的分支上传到远程仓库，并把这个 branch 的路径上的所有 commits 也一并上传。
push 的时候，如果当前分支是一个本地创建的分支，需要指定远程仓库名和分支名，用 git push origin branch_name 的格式，而不能只用 git push；或者可以通过 git config 修改 push.default 来改变 push 时的行为逻辑。
push 的时候之后上传当前分支，并不会上传 HEAD；远程仓库的 HEAD 是永远指向默认分支（即 master）的。...


## merge
merge 的意思是「合并」，它做的事也是合并：指定一个 commit，把它合并到当前的 commit 来。合并的时候自动生产一个新的commit
pull 的实际操作其实是把远端仓库的内容用 fetch 取下来之后，用 merge 来合并。

merge 的含义：从两个 commit「分叉」的位置起，把目标 commit 的内容应用到当前 commit（HEAD 所指向的 commit），并生成一个新的 commit；
merge 的适用场景：
单独开发的 branch 用完了以后，合并回原先的 branch；
git pull 的内部自动操作。
merge 的三种特殊情况：
冲突
原因：当前分支和目标分支修改了同一部分内容，Git 无法确定应该怎样合并；
应对方法：解决冲突后手动 commit。
HEAD 领先于目标 commit：Git 什么也不做，空操作；
HEAD 落后于目标 commit：fast-forward。...


rebase 的意思是，给你的 commit 序列重新设置基础点（也就是父 commit）。展开来说就是，把你指定的 commit 以及它所在的 commit 串，以指定的目标 commit 为基础，依次重新提交一次。例如下面这个 merge：...

commit --amend 并不是直接修改原 commit 的内容，而是生成一条新的 commit。用这个新的 commit 把当前 commit 替换掉


说明：在 Git 中，有两个「偏移符号」： ^ 和 ~。

^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。

~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。...
那么你可以用 reset --hard 来撤销这条 commit。

git reset --hard HEAD^
HEAD 表示 HEAD^ 往回数一个位置的 commit ，上节刚说过，记得吧？

这节的内容是「撤销过往的提交」。方法有两种：

用 git rebase -i 在编辑界面中删除想撤销的 commits
用 git rebase --onto 在 rebase 命令中直接剔除想撤销的 commits

这节的内容是讲当错误的 commit 已经被 push 上去时的解决方案。具体的方案有两类：

如果出错内容在私有 branch：在本地把内容修正后，强制 push (push -f）一次就可以解决；
如果出错内容在 master：不要强制 push，而要用 revert 把写错的 commit 撤销。...

reset 的本质：移动 HEAD 以及它所指向的 branch

实质上，reset 这个指令虽然可以用来撤销 commit ，但它的实质行为并不是撤销，而是移动 HEAD ，并且「捎带」上 HEAD 所指向的 branch（如果有的话）。也就是说，reset 这个指令的行为其实和它的字面意思 "reset"（重置）十分相符：它是用来重置 HEAD 以及它所指向的 branch 的位置的。...
reset 指令可以重置 HEAD 和 branch 的位置，不过在重置它们的同时，对工作目录可以选择不同的操作，而对工作目录的操作的不同，就是通过 reset 后面跟的参数来确定的。



reset --hard：重置工作目录
reset --hard 会在重置 HEAD 和 branch 的同时，重置工作目录里的内容。当你在 reset 后面加了 --hard 参数时，你的工作目录里的内容会被完全重置为和 HEAD 的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。...
--soft 和 --hard 的区别：--hard 会清空工作目录的改动，而 --soft 则会保留工作目录的内容，并把因为保留工作目录内容所带来的新的文件差异放进暂存区。
reset 如果不加参数，那么默认使用 --mixed 参数。它的行为是：保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 reset 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合（mixed）放在工作目录中」...
git checkout branch名 的本质，其实是把 HEAD 指向指定的 branch，然后签出这个 branch 所对应的 commit 的工作目录。所以同样的，checkout 的目标也可以不是 branch，而直接指定某个 commit...
checkout 的本质是签出指定的 commit，所以你不止可以切换 branch，也可以直接指定 commit 作为参数，来把 HEAD 移动到指定的 commit。
checkout 和 reset 都可以切换 HEAD 的位置，它们除了有许多细节的差异外，最大的区别在于：reset 在移动 HEAD 时会带着它所指向的 branch 一起移动，而 checkout 不会。当你用 checkout 指向其他地方的时候，HEAD 和 它所指向的 branch 就自动脱离了。...
stash：临时存放工作目录的改动
"stash" 这个词，和它意思比较接近的中文翻译是「藏匿」，是「把东西放在一个秘密的地方以备未来使用」的意思。在 Git 中，stash 指令可以帮你把工作目录的内容全部放在你本地的一个独立的地方，它不会被提交，也不会被删除，你把东西放起来之后就可以去做你的临时工作了，做完以后再来取走，就可以继续之前手头的事了。...
git stash
git stash pop

注意：没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。就像这样：

git stash -u...

reflog 是 "reference log" 的缩写，使用它可以查看 Git 仓库中的引用的移动记录。如果不指定引用，它会显示 HEAD 的移动记录。假如你误删了 branch1 这个 branch，那么你可以查看一下 HEAD 的移动历史：...

注意：不再被引用直接或间接指向的 commits 会在一定时间后被 Git 回收，所以使用 reflog 来找回删除的 branch 的操作一定要及时，不然有可能会由于 commit 被回收而再也找不回来。
reflog 默认查看 HEAD 的移动历史，除此之外，也可以手动加上名称来查看其他引用的移动历史，例如某个 branch：

git reflog master

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区














https://juejin.im
掘金 — 一个帮助开发者成长的社区git commit --amend

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区
https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

> 

https://juejin.im
掘金 — 一个帮助开发者成长的社区


checkout 的意思就是把某个 commit 作为当前 commit，把 HEAD 移动过去，并把工作目录的文件内容替换成这个 commit 所对应的内容

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区



https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

目前都是本地仓库

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区
https://juejin.im
掘金 — 一个帮助开发者成长的社区




重点！！！！！！



版本控制系统（VCS）最基本的功能是版本控制。所谓版本控制，意思就是在文件的修改历程中保留修改历史，让你可以方便地撤销之前对文件的修改操作。
版本控制、主动提交、中央仓库这三个要素，共同构成了版本控制系统（VCS）的核心：开发团队中的每个人向中央仓库主动提交自己的改动和同步别人的改动，并在需要的时候查看和操作历史版本，这就是版本控制系统。
中央式 VCS 的中央仓库有两个主要功能：保存版本历史、同步团队代码。
分布式 VCS 的中央仓库有两个主要功能：同步团队代码。因为本地能保存版本历史。

.git 目录，就是你的本地仓库（Local Repository），你的所有版本信息都会存在这里。而 .git 所在的这个根目录，称为 Git 的工作目录（Working Directory），它保存了你当前从仓库中签出（checkout）的内容。...

status 是用来查看工作目录当前状态的指令

staging area，是 .git 目录下一个叫做 index 的文件（嗯，它的文件名并不叫 stage ）。你通过 add 指令暂存的内容，都会被写进这个文件里。从 "untracked"（未跟踪）变成了 "staged"（已暂存）("to be commited") 

commit进入vi，i esc ZZ

origin/master 的中的 origin 是远端仓库的名称，是你在用 clone 指令初始化本地仓库时 Git 自动帮你起的默认名称；master 是 origin 上的分支名称。不过对于现在来说，可以暂时把 origin/master 简单理解为「中央仓库」...

从 GitHub 把中央仓库 clone 到本地（使用命令： git clone）
把写完的代码提交（先用 git add 文件名 把文件添加到暂存区，再用 git commit 提交）
在这个过程中，可以使用 git status 来随时查看工作目录的状态
每个文件有 "changed / unstaged"（已修改）, "staged"（已修改并暂存）, "commited"（已提交） 三种状态，以及一种特殊状态 "untracked"（未跟踪）
提交一次或多次之后，把本地提交 push 到中央仓库（git push）

假装另外一个人
git clone https://github.com/rengwuxian/git-practice.git git-practice-another

由于 GitHub 的远端仓库上含有本地仓库没有的内容，所以这次 push 被拒绝了。这种冲突的解决方式其实很简单：先用 pull 把远端仓库上的新内容取回到本地和本地合并，然后再把合并后的本地仓库向远端仓库推送。

这种「把不同的内容进行合并，生成新的提交」的操作，叫做合并（呵呵呵哈哈），它所对应的 Git 指令是 merge。事实上，git pull 这个指令的内部实现就是把远程仓库使用 git fetch 取下来以后再进行 merge 操作的。关于更多 merge 的介绍，我会在后面说，这节先不讲了。...


远程仓库 1-2-3
a和b clone下来 1-2-3
a提交2个commits，并推送到远程  
a和远程  1-2-3-4-5   
b也提交2个commits，变成 1-2-3-4.1-5.1  但是pull的时候如果冲突，解决掉冲突，重新commit变成
1-2-3-4-5-4.1-5.1-6.1,不冲突的话，1-2-3-4-5-4.1-5.1，此时推送的话远程也会变成这样。


HEAD master branch  都是commit的引用，指向某个commit，和commit_id（至少4位）一样。Git 中的 HEAD 和每一个 branch 以及其他的引用，都是以文本文件的形式存储在本地仓库 .git 目录中，而 Git 在工作的时候，就是通过这些文本文件的内容来判断这些所谓的「引用」是指向谁的。


HEAD -> master, origin/master, origin/HEAD ，是几个指向这个 commit 的引用。

当前 commit（当前工作目录所对应的 commit） 在哪里，HEAD 就在哪里，这是一个永远自动指向当前 commit 的引用，所以你永远可以用 HEAD 来操作当前 commit。所以，当使用 checkout、reset 等指令手动指定改变当前 commit 的时候，HEAD 也会一起跟过去。

HEAD 除了可以指向 commit，还可以指向一个 branch，当它指向某个 branch 的时候，会通过这个 branch 来间接地指向某个 commit；另外，当 HEAD 在提交时自动向前移动的时候，它会像一个拖钩一样带着它所指向的 branch 一起移动。如HEAD -> master 中的 master 就是一个 branch 的名字，而它左边的箭头 -> 表示 HEAD 正指向它（当然，也会间接地指向它所指向的 commit）。

checkout 的意思就是把某个 commit 作为当前 commit，HEAD 也就自动移过去，并把工作目录的文件内容替换成这个 commit 所对应的内容。也就是可以让工作目录快速变成任意一个commit。也就快速回到任意一个版本查看。

branch是某个commit的引用，也就是一旦切到branch（checkout，HEAD也会跟过去）

git branch branch名称  建立引用
git checkout branch  
git branch -d branch名称


git checkout  某个commit引用 分为两种情况，如果引用不是branch的话，就只会当前目录变化，HEAD直接指向commit，如果是branch的话，当前目录变化，HEAD指向branch，branch指向commit。

删除分支需要注意
    1. HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。

    1. 由于 Git 中的 branch 只是一个引用，所以删除 branch 的操作也只会删掉这个引用，并不会删除任何的 commit。（不过如果一个 commit 不在任何一个 branch 的「路径」上，或者换句话说，如果没有任何一个 branch 可以回溯到这条 commit（也许可以称为野生 commit？），那么在一定时间后，它会被 Git 的回收机制删除掉。）

    1. 出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（因为怕你误删掉「未完成」的 branch 啊）这种情况如果你确认是要删除这个 branch （例如某个未完成的功能被团队确认永久毙掉了，不再做了），可以把 -d 改成 -D，小写换成大写，就能删除了。...



切换到某个branch，只能看到这条路的commits。新建branch的时候，如果提交代码就会形成新的路径。


git push 把当前 branch 的位置（即它指向哪个 commit）上传到远端仓库，并把它的路径上的 commits 一并上传。
这里的 git push 和之前有点不同：多了 origin feature1 这两个参数。其中 origin 是远程仓库的别名，是你在 git clone 的时候 Git 自动帮你起的；feature1 是远程仓库中目标 branch 的名字。这两个参数合起来指定了你要 push 到的目标仓库和目标分支，意思是「我要 push 到 origin 这个仓库的 feature1 分支」。

在 Git 中（2.0 及它之后的版本），默认情况下，你用不加参数的 git push 只能上传那些之前从远端 clone 下来或者 pull 下来的分支，而如果需要 push 你本地的自己创建的分支，则需要手动指定目标仓库和目标分支（并且目标分支的名称必须和本地分支完全相同），就像上面这样。

你可以通过 git config 指令来设置 push.default 的值来改变 push 的行为逻辑，例如可以设置为「所有分支都可以用 git push 来直接 push，目标自动指向 origin 仓库的同名分支」（对应的 push.default 值：current），或者别的什么行为逻辑，你甚至可以设置为每次执行 git push 时就自动把所有本地分支全部同步到远程仓库（虽然这可能有点耗时和危险）。如果希望详细了解，你可以到这里看看。...

merge 的意思是「合并」，它做的事也是合并：指定一个 commit，把它合并到当前的 commit 来。具体来讲，merge 做的事是：

从目标 commit 和当前 commit （即 HEAD 所指向的 commit）分叉的位置起，把目标 commit 的路径上的所有 commit 的内容一并应用到当前 commit，然后自动生成一个新的 commit。...


github的pull request 

add 添加的是文件改动，而不是文件名

查看历史中的多个 commit：log
查看详细改动： git log -p
查看大致改动：git log --stat
查看具体某个 commit：show
要看最新 commit ，直接输入 git show ；要看指定 commit ，输入 git show commit的引用或SHA-1
如果还要指定文件，在 git show 的最后加上文件名
查看未提交的内容：diff
查看暂存区和上一条 commit 的区别：git diff --staged（或 --cached）
查看工作目录和暂存区的区别：git diff 不加选项参数
查看工作目录和上一条 commit 的区别：git diff HEAD...

rebase给你的 commit 序列重新设置基础点（也就是父 commit）。展开来说就是，把你指定的 commit 以及它所在的 commit 串，以指定的目标 commit 为基础，依次重新提交一次。

如果本来branch1的基础点是2，
```shell
git checkout branch1
// 将branch1的基点换成master指向的commit
git rebase master
// 以下操作 是让master指向最新的commit 如果不切换分支的话 等于不操作
git checkout master
git merge branch1
```
我觉得先用合并算了，rebase比merge还麻烦点

## 修改错误

### 倒数第一个commit错误

"amend" 是「修正」的意思。在提交时，如果加上 --amend 参数，Git 不会在当前 commit 上增加 commit，而是会把当前 commit 里的内容和暂存区（stageing area）里的内容合并起来后创建一个新的 commit，用这个新的 commit 把当前 commit 替换掉。所以 commit --amend 做的事就是它的字面意思：对最新一条 commit 进行修正。其实就是把上条commit干掉。

### 倒数第二个commit错误

所谓「交互式 rebase」，就是在 rebase 的操作执行之前，你可以指定要 rebase 的 commit 链中的每一个 commit 是否需要进一步修改。

在 Git 中，有两个「偏移符号」： ^ 和 ~。

^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。

~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 表示 HEAD 指向的 commit往前数 5 个 commit。...


HEAD 是倒数第一个commit
HEAD^^ 倒数第三个commit
HEAD～2 倒数第三个commit

交互式 rebase 最常用的场景是修改写错的 commit，但也可以用作其他用途。它的大致用法：

使用方式是 git rebase -i 目标commit；
在编辑界面中指定需要操作的 commits 以及操作类型；
操作完成之后用 git rebase --continue 来继续 rebase 过程。...

撤销最新提交，方式是通过 reset --hard：

实质上，reset 这个指令虽然可以用来撤销 commit ，但它的实质行为并不是撤销，而是移动 HEAD ，并且「捎带」上 HEAD 所指向的 branch（如果有的话）。也就是说，reset 这个指令的行为其实和它的字面意思 "reset"（重置）十分相符：它是用来重置 HEAD 以及它所指向的 branch 的位置的。...

https://juejin.im
掘金 — 一个帮助开发者成长的社区
git reset --hard 目标commit

用 git rebase -i 在编辑界面中删除想撤销的 commits

远程仓库
希望用本地的内容覆盖掉中央仓库的内容
在自己的分枝上git push origin branch1 -f

在master上的话
撤销哪个 commit，就把它填在后面：
git revert HEAD^
上面这行代码就会增加一条新的 commit，它的内容和倒数第二个 commit 是相反的，从而和倒数第二个 commit 相互抵消，达到撤销的效果。

git checkout branch名 的本质，其实是把 HEAD 指向指定的 branch，然后签出这个 branch 所对应的 commit 的工作目录

checkout 和 reset 都可以切换 HEAD 的位置，它们除了有许多细节的差异外，最大的区别在于：reset 在移动 HEAD 时会带着它所指向的 branch 一起移动，而 checkout 不会。当你用 checkout 指向其他地方的时候，HEAD 和 它所指向的 branch 就自动脱离了。...

快速暂存工作目录
git stash -u
git stash pop

reflog 是 "reference log" 的缩写，使用它可以查看 Git 仓库中的引用的移动记录。如果不指定引用，它会显示 HEAD 的移动记录。
git reflog

命令git tag <tagname>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
命令git tag <tagname> <commitid>用于新建一个标签，默认为HEAD，也可以指定一个commit id；

重点：命令git tag -a <tagname> <commitid> -m "blablabla..."可以指定标签信息；

命令git tag可以查看所有标签。

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

git rebase -i 

https://juejin.im
掘金 — 一个帮助开发者成长的社区


https://juejin.im
掘金 — 一个帮助开发者成长的社区


https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区




https://juejin.im
掘金 — 一个帮助开发者成长的社区






https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区

https://juejin.im
掘金 — 一个帮助开发者成长的社区


## git就是分布式版本控制系统

版本控制，同步代码就是git的核心。

## HEAD branch master

每次commit提交就是一次版本。每个版本有自己的id。
HEAD/master/branch  都是某个commit的快捷方式。
HEAD它是指向当前 commit 的引用。所谓**当前 commit**这个概念很简单，它指的就是当前工作目录所对应的 commit。当前 commit 在哪里，HEAD 就在哪里，这是一个永远自动指向当前 commit 的引用，所以你永远可以用 HEAD 来操作当前 commit。
HEAD 除了可以指向 commit，还可以指向一个 branch，当它指向某个 branch 的时候，会通过这个 branch 来间接地指向某个 commit；另外，当 HEAD 在提交时自动向前移动的时候，它会像一个拖钩一样带着它所指向的 branch 一起移动。
branch 只是一个指向 commit 的引用，但它有一个更通俗的理解：你还可以把一个 branch 理解为从初始 commit 到 branch 所指向的 commit 之间的所有 commits 的一个「串」。
master ，其实是一个特殊的 branch：它是 Git 的默认 branch（俗称主 branch / 主分支）
branch 包含了从初始 commit 到它的所有路径（合并之后形成多个路径），而不是一条路径。并且，这些路径之间也是彼此平等的。


commit的时候HEAD和其指向的branch自动更换到最新的commit。

## push

push 做的事是：把当前 branch 的位置（即它指向哪个 commit）上传到远端仓库，并把它的路径上的 commits 一并上传。`git push origin branch`或者设置`git config --global push.default current`

## pull

pull 的内部操作其实是把远程仓库取到本地后（使用的是 fetch），再用一次 merge 来把远端仓库的新 commits 合并到本地。

## add

add 添加进暂存区的不是文件名，而是具体的文件改动内容。
add 指令除了 `git add 文件名` 这种用法外，还可以使用 `git add .` 来直接把工作目录下的所有改动全部放进暂存区

## merge

merge从目标 commit 和当前 commit （即 HEAD 所指向的 commit）分叉的位置起，把目标 commit 的路径上的所有 commit 的内容一并应用到当前 commit，然后自动生成一个新的 commit。注意目标分支的指向并没有发生变化。

```shell
git merge branch1
```

## rebase

rebase 的意思是，给你的 commit 序列重新设置基础点（也就是父 commit）。展开来说就是，把你指定的 commit 以及它所在的 commit 串，以指定的目标 commit 为基础，依次重新提交一次。

## reset

reset 指令的本质：重置 HEAD 以及它所指向的 branch 的位置。同时，介绍了 reset 的三种参数：

--hard：重置位置的同时，清空工作目录的所有改动；
--soft：重置位置的同时，保留工作目录和暂存区的内容，并把重置 HEAD 的位置所导致的新的文件差异放进暂存区。
--mixed（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区。...

## checkout


checkout 的本质是签出指定的 commit，所以你不止可以切换 branch，也可以直接指定 commit 作为参数，来把 HEAD 移动到指定的 commit。
git checkout branch名 的本质，其实是把 HEAD 指向指定的 branch，然后签出这个 branch 所对应的 commit 的工作目录。所以同样的，checkout 的目标也可以不是 branch，而直接指定某个 commit。

checkout 和 reset 都可以切换 HEAD 的位置，它们除了有许多细节的差异外，最大的区别在于：reset 在移动 HEAD 时会带着它所指向的 branch 一起移动，而 checkout 不会。当你用 checkout 指向其他地方的时候，HEAD 和 它所指向的 branch 就自动脱离了。...

## 常用命令

### branch

新建  git branch name1
切换  git checkout name1
删除  git branch -d name1
checkout 的意思就是把某个 commit 作为当前 commit，把 HEAD 移动过去，并把工作目录的文件内容替换成这个 commit 所对应的内容

### log

git log 查看提交历史

git log -p 查看详细历史 patch
git log --stat 简要查看

git show commitid 查看某次的提交，show 后面加上这个 commit 的引用（branch 或 HEAD 标记）或它的 SHA-1 码，如果还要指定文件，在 git show 的最后加上文件名

### diff

查看未提交的内容：diff
查看暂存区和上一条 commit 的区别：git diff --staged（或 --cached）
查看工作目录和暂存区的区别：git diff 不加选项参数
查看工作目录和上一条 commit 的区别：git diff HEAD...
