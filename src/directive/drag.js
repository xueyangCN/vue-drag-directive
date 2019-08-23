import { get } from "http";

export default {
    install: (Vue) => {
        Vue.directive('dragme',
            function(el,config){
                let options = {
                    locked: config.value&&config.value.locked,//禁止拖拽
                    done: el.__vue__&&el.__vue__.__onDrugDone__,//完成一次拖拽回调
                    gridX: config.value&&config.value.gridX || 0,//横向栅格长度
                    gridY: config.value&&config.value.gridY || 0,//纵向栅格长度
                    checkTouch: config.value&&config.value.checkTouch,//是否检测碰撞
                    onTouched: el.__vue__&&el.__vue__.__onTouched__,//有元素碰撞时触发
                    isChangePos: config.value&&config.value.changePosition,//碰撞后是否交换位置,需开启碰撞检测
                    isBackStartPoint: config.value&&config.value.isBackStartPoint,//拖拽完成时返回起点
                    noOverLap: config.value&&config.value.noOverLap,//配置拖拽时所有元素不重叠
                    limitPar: config.value&&config.value.limitPar,//限制元素只在父容器中拖拽
                    limitX: config.value&&config.value.limitX,//限制元素只在x轴移动
                    limitY: config.value&&config.value.limitY,//限制元素只在x轴移动
                }
                if(options.checkTouch){
                    addClass(el,' __checkTouchBox__')
                }
                el.style.position = 'absolute';
                el.onmousedown = (e1) => {
                    if(options.locked){
                        return;
                    }
                    if(options.isBackStartPoint){
                        var cloneNode = el.cloneNode(true);
                        cloneNode.style.zIndex = '-1';
                        removeClass(cloneNode,'__checkTouchBox__');
                        el.offsetParent.appendChild(cloneNode);
                    }
                    //获取父级容器位置
                    let paXY = el.offsetParent?getPosition(el.offsetParent):getPosition(el);
                    //记录元素起始相对位置
                    let elXY = [el.offsetLeft,el.offsetTop];
                    
                    //记录元素绝对位置
                    let position = getPosition(el);
                    el.posx = position[0];
                    el.posy = position[1];
                    //记录鼠标相对元素位置
                    let mouseXY = [
                        e1.clientX - position[0],
                        e1.clientY - position[1]
                    ]
                    document.onmousemove = (e2) => {
                        if(e2.preventDefault){
                            e2.preventDefault();
                        }else{
                            window.event.returnValue == false;
                        }
                        el.__vue__&&el.__vue__.__dragStart__&&el.__vue__.__dragStart__(elXY,e2);
                        //计算坐标
                        let elPositionX = (e2.clientX - paXY[0] - mouseXY[0]);
                        let elPositionY = (e2.clientY - paXY[1] - mouseXY[1]);
                        if(options.limitPar){
                            if(elPositionX<0){
                                elPositionX = 0;
                            }
                            if(el.offsetParent&&(elPositionX+el.offsetWidth)>el.offsetParent.offsetWidth){
                                elPositionX = el.offsetParent.offsetWidth-el.offsetWidth;
                            }
                            if(elPositionY<0){
                                elPositionY = 0;
                            }
                            if(el.offsetParent&&(elPositionY+el.offsetHeight)>el.offsetParent.offsetHeight){
                                elPositionY = el.offsetParent.offsetHeight-el.offsetHeight;
                            }
                        }
                        if(!options.limitY){
                            el.style.left = elPositionX + 'px';
                        }
                        if(!options.limitX){
                            el.style.top = elPositionY + 'px';
                        }
                        if(options.checkTouch){
                            checkAllTouch(el,{
                                noOverLap: options.noOverLap,
                                onTouched: options.onTouched,
                            }); 
                        }
                        document.onmouseup = () => {
                            let touchedNodeList = [];
                            //计算栅格偏移量
                            if(options.gridX&&!options.limitY){
                                el.style.left = Math.round(elPositionX/options.gridX)*options.gridX+ 'px';
                            }
                            if(options.gridY&&!options.limitX){
                                el.style.top = Math.round(elPositionY/options.gridY)*options.gridY  + 'px';
                            }
                            if(options.limitPar){
                                if(!options.limitY&&parseInt(el.style.left)<0){
                                    el.style.left = 0;
                                }
                                if(!options.limitY&&el.offsetParent&&(parseInt(el.style.left)+el.offsetWidth)>el.offsetParent.offsetWidth){
                                    el.style.left = el.offsetParent.offsetWidth-el.offsetWidth + 'px';
                                }
                                if(!options.limitX&&parseInt(el.style.top)<0){
                                    el.style.top = 0;
                                }
                                if(!options.limitX&&el.offsetParent&&(parseInt(el.style.top)+el.offsetHeight)>el.offsetParent.offsetHeight){
                                    el.style.top  = el.offsetParent.offsetHeight-el.offsetHeight + 'px';
                                }
                            }
                            if(options.isBackStartPoint){
                                el.style.left = elXY[0] + 'px';
                                el.style.top = elXY[1] + 'px';
                                cloneNode.remove();
                            }
                            if(options.checkTouch){
                                touchedNodeList = checkAllTouch(el,{
                                    noOverLap: options.noOverLap,
                                    onTouched: options.onTouched,
                                    end: true,
                                    callback: (list) => {//list为所有与拖拽元素接触的元素
                                        var nearEl = null,num = Infinity;
                                        for(let i = 0;i<list.length;i++){
                                            if(checkInsert(el,list[i])){//嵌入时触发 __beInsert__
                                                let this_pos = getPosition(list[i]);
                                                let nowElPos = getPosition(el);
                                                (list[i].__vue__&&list[i].__vue__.__beInsert__)&&list[i].__vue__.__beInsert__({x:(nowElPos[0] - this_pos[0]),y:(nowElPos[1] - this_pos[1])},el,el.__vue__);
                                            }
                                            let distance = getDistance(el,list[i]);
                                            if(distance<num){
                                                num = distance;
                                                nearEl = list[i];
                                            }
                                        }
                                        if(options.isBackStartPoint){
                                            return;
                                        }
                                        if(!options.isChangePos){
                                            return;
                                        }
                                        if(nearEl){
                                            //获取最近元素绝对位置
                                            let pos = getPosition(nearEl);
                                            //获取最近元素父级绝对位置
                                            let paNearXY = nearEl.offsetParent?getPosition(nearEl.offsetParent):getPosition(nearEl);
                                            el.style.left = pos[0] - paXY[0] + 'px';
                                            el.style.top = pos[1]- paXY[1] + 'px';
                                            nearEl.style.left = position[0] - paNearXY[0] + 'px';
                                            nearEl.style.top = position[1] - paNearXY[1] + 'px';
                                        }
                                        
                                    }
                                }); 
                            }
                            document.onmousemove = null;
                            options.done&&options.done({
                                touchedNodeList,
                                nowPosition: {
                                    x: parseInt(el.style.left),
                                    y: parseInt(el.style.top)
                                },
                                startPosition: {
                                    x: elXY[0],
                                    y: elXY[1]
                                }
                            })
                        }
                    }
                    
                }
            }
        )
    }
}
//检测碰撞元素
function checkAllTouch(el,options,sourceEl){
    let end = options.end || false;
    let items = document.querySelectorAll('.__checkTouchBox__');
    //接触元素数组，vue实例对象
    let touchedNodeList = [];
    //接触元素数组，原生对象
    let touchedElList = [];
    for(let i = 0;i<items.length;i++){
        if(items[i] === el||items[i] === sourceEl){
            continue;
        }
        if(checkTouch(el,items[i],items,options.noOverLap)){
            // console.log('-----碰撞-----');
            touchedElList.push(items[i]);
            if(items[i].__vue__){
                touchedNodeList.push(items[i].__vue__);
            }else{
                touchedNodeList.push(items[i]);
            }
            touchedElList = Array.from(new Set(touchedElList));
            touchedNodeList = Array.from(new Set(touchedNodeList));
            if(el.__vue__&&items[i].__vue__){
                items[i].__vue__.beTouched_ = true;
                items[i].__vue__.__onBeTouched__&&items[i].__vue__.__onBeTouched__({//触发被触碰组件事件,过程触发
                    from: el.__vue__
                });
                if(end){
                    items[i].__vue__.__nBeTouchedEnd__&&items[i].__vue__.__nBeTouchedEnd__({//触发被触碰组件事件,结束触发
                        from: el.__vue__
                    });
                }
            }else if(items[i].__vue__){
                items[i].__vue__.beTouched_ = true;
                items[i].__vue__.__onBeTouched__&&items[i].__vue__.__onBeTouched__({//触发被触碰组件事件，过程触发
                    from: el
                });
                if(end){
                    items[i].__vue__.__nBeTouchedEnd__&&items[i].__vue__.__nBeTouchedEnd__({//触发被触碰组件事件,结束触发
                        from: el
                    });
                }
            }
            if(!hasClass(items[i],'__beTouched__')){
                addClass(items[i],'__beTouched__');
            }
            continue;
        }
        if(!sourceEl&&hasClass(items[i],'__beTouched__')){
            removeClass(items[i],'__beTouched__');
        }
        items[i].__vue__&&(items[i].__vue__.beTouched_ = false);
    }
    if(touchedNodeList.length){
        options&&options.onTouched&&options.onTouched({//触发本指令碰撞事件
            touchedNodeList
        });
    }
    options&&options.callback&&options.callback(touchedElList);
    return touchedNodeList;
}
//检测碰撞
function checkTouch(el1,el2,items,noOverLap){
    let position1 = getPosition(el1),position2 = getPosition(el2);
    let left1 = position1[0],top1 = position1[1];
    let left2 = position2[0],top2 = position2[1];
    let width1 = el1.offsetWidth,height1 = el1.offsetHeight;
    let width2 = el2.offsetWidth,height2 = el2.offsetHeight;
    let right1 = left1+width1,bottom1 = top1+height1;
    let right2 = left2+width2,bottom2 = top2+height2;
    if(
        (left1>left2&&left1<right2&&top1>top2&&top1<bottom2) ||
        (right1>left2&&right1<right2&&top1>top2&&top1<bottom2) ||
        (left1>left2&&left1<right2&&bottom1>top2&&bottom1<bottom2)||
        (right1>left2&&right1<right2&&bottom1>top2&&bottom1<bottom2) ||
        (left2>left1&&left2<right1&&top2>top1&&top2<bottom1) ||
        (right2>left1&&right2<right1&&top2>top1&&top2<bottom1) ||
        (left2>left1&&left2<right1&&bottom2>top1&&bottom2<bottom1)||
        (right2>left1&&right2<right1&&bottom2>top1&&bottom2<bottom1)||
        ((left1>left2&&left1<right2||right1>left2&&right1<right2)&&top1==top2&&bottom1==bottom2)||
        ((top1>top2&&top1<bottom2||bottom1>top2&&bottom1<bottom2)&&left1==left2&&right1==right2)
    ){
        //配置所有元素不重叠
        if(noOverLap){
            let w = 0,h = 0,left = true,top = true,x = true;
            if(right1>left2&&left1<left2){
                w = (right1 - left2);
            }else if(right1>right2&&left1<right2){
                w = (right2 - left1);
                left = false;
            }
            if(bottom1>top2&&top1<top2){
                h = (bottom1 - top2);
            }else if(bottom1>bottom2&&top1<bottom2){
                h = (bottom2 - top1);
                top = false;
            }
            x = (w<=h);
            if(right1<=right2&&left1>=left2){
                x = false;
                if(top1<bottom2&&bottom1>bottom2){
                    top = false;
                }
            }else if(right1>=right2&&left1<=left2){
                x = false;
                if(top1<bottom2&&bottom1>bottom2){
                    top = false;
                }
            }
            if(top1>=top2&&bottom1<=bottom2){
                x = true;
                if(left1<right2&&right1>right2){
                    left = false;
                }
            }else if(top1<=top2&&bottom1>=bottom2){
                x = true;
                if(left1<right2&&right1>right2){
                    left = false;
                }
            }
            if(x){
                let el2ParentPosX = el2.offsetParent?getPosition(el2.offsetParent)[0]:0;
                if(left){
                    el2.style.left = right1 - el2ParentPosX + 'px';
                }else{
                    el2.style.left = left1 - el2.offsetWidth - el2ParentPosX + 'px';
                }
            }else{
                let el2ParentPosY = el2.offsetParent?getPosition(el2.offsetParent)[1]:0;
                if(top){
                    el2.style.top = bottom1 - el2ParentPosY + 'px';
                }else{
                    el2.style.top = top1 - el2.offsetHeight - el2ParentPosY + 'px';
                }
            }
            setTimeout(() => {//放在最后执行，同步会造成类名检测异常
                checkAllTouch(el2,{noOverLap: true},el1)
            },0)
        }
        return true;
    }else{
        return false;
    }
}
//检测嵌入
function checkInsert(el1,el2){
    let position1 = getPosition(el1),position2 = getPosition(el2);
    let left1 = position1[0],top1 = position1[1];
    let left2 = position2[0],top2 = position2[1];
    let width1 = el1.offsetWidth,height1 = el1.offsetHeight;
    let width2 = el2.offsetWidth,height2 = el2.offsetHeight;
    let right1 = left1+width1,bottom1 = top1+height1;
    let right2 = left2+width2,bottom2 = top2+height2;
    if(left1>left2&&right1<right2&&top1>top2&&bottom1<bottom2){
        return true;
    }else{
        return false;
    }
}

//获取绝对位置
function getPosition(el,position){
    if(!position){
        position = [0,0];
    }
    position[0] +=  el.offsetLeft;
    position[1] += el.offsetTop;
    if(el.offsetParent){
        return getPosition(el.offsetParent,position);
    }else{
        return position;
    }
}
//增加一个classname
function addClass(el,className){
    el.className += ' '+className;
}
//删除一个classname
function removeClass(el,className){
    el.className = el.className.split(' '+className).join('');
}
//判断一个元素中是否含有某类名
function hasClass(el,className){
    let reg = new RegExp(className,'g');
    return reg.test(el.className);
}
//获取两元素中心距离
function getDistance(el1,el2){
    let pos1 = getPosition(el1),pos2 = getPosition(el2);
    let posX1 = pos1[0]+(el1.offsetWidth/2);
    let posY1 = pos1[0]+(el1.offsetHeight/2);
    let posX2 = pos2[0]+(el2.offsetWidth/2);
    let posY2 = pos2[0]+(el2.offsetHeight/2);
    return Math.pow(Math.pow((posX1-posX2), 2 )+Math.pow((posY1-posY2), 2 ),0.5);
}