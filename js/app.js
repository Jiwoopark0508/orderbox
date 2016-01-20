$(document).ready(function(){

    var model = {
        goods : [ {name : 'banana',
                    price : 3000,
                    amount : 0},
                  {name :'mango',
                    price : 2000,
                    amount : 0}, 
                {name : 'strawberry',
                    price : 5000,
                    amount : 0} ],

        box : [],

        total : function(){
            var total = 0;
            this.box.forEach(function ( item ){
                total += item.price * item.amount;
            })
            return total;
        }

    }

    var octopus = {
        init : function(){
            viewList.init();
            viewBox.init();
            viewList.render();
        },

        getGoods : function(){
            return model.goods;
        },
        addGoods : function(goods){
            //box에 상품이 없는 경우
            if( $.inArray(goods, model.box) == -1){
                model.box.push(goods);
                octopus.incrementCount(goods);

            }
            //box에 상품이 있는 경우
            else{
                octopus.incrementCount(goods);
            }
            
            
            viewList.render();
            viewBox.render();
        },

        getBag : function(){
            return model.box;
        },
        getTotal : function(){
            return model.total();
        },
        incrementCount : function(good){
            good.amount += 1;
        },
        removeItem : function(good){
            console.log(good);
            model.box = jQuery.grep( model.box, function(value){
                return value != good;
            })

            viewBox.render();
            good.amount = 0;
        },


    }

    var viewList = {
        init : function(){
            this.num_goods = octopus.getGoods().length;
            this.list = $(".container ul");
        },

        render : function(){
            this.list.html('');
            goods = octopus.getGoods(); 
            goods.forEach(function(good){
                var li = $("<li></li>");

                li.append(good.name + ' price : ' + good.price);
                li.click((function(goodCopy){
                                    return function(){
                                        octopus.addGoods(goodCopy);
                                    }
                                })(good));
                viewList.list.append(li);
            })

        }
    }
    var viewBox = {
        init : function(){
            this.box = $('.orderbox');
        },

        render : function(){
            this.box.html('');
            box = octopus.getBag();
            num_goods = box.length;
            for( var i = 0; i < num_goods; i += 1 ){
                item = box[i];
                viewBox.box.append('<div>'+ item.name + ' 수량 ' + item.amount + ' <a class = "cancel">[x]</a>' +'</div>');
                $('.cancel:last').click((function(itemCopy){
                    return function(){
                        octopus.removeItem(itemCopy);
                    }
                })(item));
            }
            $(this.box).append('<h1>' + octopus.getTotal() + '</h1>');
        }
    }

    octopus.init();

})