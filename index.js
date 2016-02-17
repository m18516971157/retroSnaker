window.onload=function()
{
    var oBox=document.getElementById('box');    //框

    var oSnake=oBox.children[0];          //蛇

    var oNum=document.getElementById('num');
    var n1=oNum.getElementsByTagName('span')[0];  // 计分
    var n2=oNum.getElementsByTagName('span')[1];   // 难度

    var H=20;  // 20行30列
    var L=30;

    var num=0;  //计分
    var n2_num=1;  //难度

    //  修改定时器的时间 用来增加难度
    var time_arr=[150];

    var snake_arr=[];

    function setPos(obj)  // 设置蛇的坐标
    {
        obj.div.style.left=obj.l*20+'px';
        obj.div.style.top=obj.h*20+'px';
    };

    for(var i=0;i<5;i++)
    {
        var snake_body=document.createElement('div');  // 创建蛇的身体

        oSnake.appendChild(snake_body);

        if(i==0)  //蛇头
        {
            snake_body.style.background='#999';
            snake_body.style.zIndex=2;
        };

        snake_arr[i]={h:10,l:15+i,div:snake_body};  //蛇身

        setPos(snake_arr[i]);
    };

    var move='left';  //默认的移动方向

    var timer=null;

    function start_move()
    {
        timer=setTimeout(function()
        {
            function Strike()  //判断撞墙或者自己
            {
                clearInterval(timer);

                return;
            };
            // 判断撞没撞墙
            if(snake_arr[0].l<0||snake_arr[0].l>29||snake_arr[0].h<0||snake_arr[0].h>19)
            {
                confirm('不可以撞墙哦！重新来吧 ^_^');

                if(true)
                {
                    location.reload();
                    Strike();
                };
            };

            // 判断撞自己
            for(var i=1;i<snake_arr.length;i++)
            {
                if(snake_arr[0].h==snake_arr[i].h&&snake_arr[0].l==snake_arr[i].l)
                {
                    confirm('不可以咬自己哦！重新来吧 ^_^');

                    if(true)
                    {
                        location.reload();
                        Strike();
                    }
                };
            };

            // 判断吃没吃到
            if(snake_arr[0].h==aEat[0].h && snake_arr[0].l==aEat[0].l)
            {
                num++;  // 每吃到一个 分数+1

                n2_num=parseInt(num/10)+1;
                //  每吃到10个 难度+1  初始值是1

                n1.innerHTML=num;

                n2.innerHTML=n2_num;

                if(n2_num>4)  //  最高速度是4
                {
                    n2_num=4;
                };

                snake_arr.splice(snake_arr.length-1,0,aEat[0]);  // 每吃一个 就把食物放进蛇的身体里

                for(var i=1;i<snake_arr.length;i++)
                {
                    snake_arr[i].div.style.background='#ccc';
                };

                aEat.pop();

                createEat();

            };

            // 每一个蛇身子的div都跟着前一个走
            for(i=snake_arr.length-1;i>0;i--)
            {
                snake_arr[i].h=snake_arr[i-1].h;

                snake_arr[i].l=snake_arr[i-1].l;
            };

            // 接收到键盘传过来的数字 走的方向
            switch(move)
            {
                case 'left':
                    snake_arr[0].l--;
                    break;
                case 'right':
                    snake_arr[0].l++;
                    break;
                case 'top':
                    snake_arr[0].h--;
                    break;
                case 'bottom':
                    snake_arr[0].h++;
                    break;
            };

            //  这句一定要加  不然蛇不会动！！（重新定位）
            for(var i=0;i<snake_arr.length;i++)
            {
                setPos(snake_arr[i]);
            };

            start_move();  // 这里利用递归思想  自己调用自己

            time_arr[0]=150-n2_num*30;  // 根据难度 动态控制蛇的速度

        },time_arr[0]);  //  注意：这里必须用setTimeout 才可以修改时间  setInterval无法修改时间


        //  判断键盘按键  37左 39右 38上 40下 83空格 32 S键
        document.onkeydown=function(ev)
        {
            var oEvent=ev||event;

            var okeyCode=oEvent.keyCode;

            if(okeyCode==37&&move!='right')
            {
                move='left';
            }
            else if(okeyCode==39&&move!='left')
            {
                move='right';
            }
            else if(okeyCode==38&&move!='bottom')
            {
                move='top';
            }
            else if(okeyCode==40&&move!='top')
            {
                move='bottom';
            };

            if(okeyCode==83)
            {
                clearInterval(timer);
            };

            if(okeyCode==32)
            {
                clearInterval(timer);
                start_move();
            };
        };
    };

    // 创建吃的东西
    var aEat=[];

    function createEat()
    {
        while(aEat.length<1)
        {
            var eat_h=parseInt(Math.random()*H);
            var eat_l=parseInt(Math.random()*L);

            var overlap=true;  //食物不能跟蛇的身体重合

            for(var i=0;i<snake_arr.length;i++)
            {
                if(eat_h==snake_arr[i].h && eat_l==snake_arr[i].l)
                {
                    overlap=false;
                }
            };

            if(overlap)
            {
                var eat_div=document.createElement('div');

                eat_div.style.position='absolute';
                eat_div.style.width='20px';
                eat_div.style.height='20px';
                eat_div.style.background='red';

                aEat.push({h:eat_h,l:eat_l,div:eat_div});
                setPos(aEat[0]);

                oBox.appendChild(eat_div);

            };
        };
    };

    createEat();

    //  空格键开始
    document.onkeyup=function(ev)
    {
        var oEvent=ev||event;

        if(oEvent.keyCode==32)
        {
            clearInterval(timer);
            start_move();
        };
    };

};
