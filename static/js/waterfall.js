/*瀑布流效果*/
var waterfall = function(){
    //首先是对demo结构进行操作
    if($(window).width() <= 1024 && $(window).width() > 767){
         
    }else if($(window).width() <= 767 && $(window).width() > 540){
        $(".element").eq(2).remove();
    }else if($(window).width() <= 540 ){
        $(".element").eq(2).remove();
        $(".element").eq(1).remove();
    }
    
    $.getJSON("../../demo/data.json",function(data){
        for(var i=0;i<data.length;i++){
            //获取高度最小的child
            var _index = getShort();
            var child = $('<div></div>');
            var image = $('<img/>');
            image.attr("src",data[i].src);
            if(window.innerWidth >= 768){
                image.css({"width":"234px","height":data[i].height * ( 214 / data[i].width ) + 'px'})
            }
            child.append( image );
            if (data[i].skill) {
                var skill_cont = $('<div></div>');
                skill_cont.css('margin-top', '10px').css('margin-bottom', 0);
                for (var j = 0; j < data[i].skill.length; j++) {
                    skill_cont.append($('<span class="skill"></span>').text(data[i].skill[j]));
                }
                skill_cont.append($('<br>'));
                child.append(skill_cont);
            }
            var description = $("<p></p>");
            description.text(data[i].des);
            var code = $("<li><a>查看代码</a></li>");
            code.attr("href",data[i].code);
            var link = $("<li><a>查看演示</a></li>");
            link.attr("href",data[i].url);

            var ul_list = $("<ul></ul>");
            ul_list.append(code).append(link); 
            child.append( description );
            child.append( ul_list );           
            $(".element").eq(_index).append( child );
        }

        var elementHArr=[];
        console.log( $(".element").eq( 0 ).height())  
        $(".element").each( function( index, value ){
            elementHArr[ index ] = $(".element").eq( index ).height(); 
            console.log( $(".element").eq( index ).height())      
        });

        var maxH = Math.max.apply( null, elementHArr );
        console.log(maxH)
        $(".demo").css("height",maxH +"px");
    }) 
};
/**
 * 获取高度最小的child,瀑布流布局时使用
 * @return {[type]} [description]
 */
function getShort(){
    var index = 0;
    var min = $(".element").eq(index).height();
    $(".element").each(function(i){
        if($(this).height() < min){
            index = i;
            min = $(this).height();
        }
    });
    return index;
};

waterfall();