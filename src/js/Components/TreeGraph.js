export default (function () {

  function createBox(height) {
    var $targetContainer = $('#graph');
    var targetheight = $targetContainer.height();

    $('svg').attr('height', $(window).height());
    $('svg').attr('width', $(window).width());


    for (var i = 0; i < height; i++) {
      var $levelContainer = $('<div class="levelFloor"></div>');
      $levelContainer.attr('index', i);
      $levelContainer.height(targetheight / height + 'px');
      $targetContainer.append($levelContainer);
    }
  }


  function createTree(items, maxWidth) {
    var $targetContainer = $('#graph');
    var nWidth = $targetContainer.width() / maxWidth;
    for (var level = 0; level < items.length; level++) {
      var itemCount = items[level].length;
      for (var count = 0; count < itemCount; count++) {
        var item = items[level][count];
        var $grid = $('<div class="grid"/>');
        $grid.css('flex', '0 0 ' + (item.grid * nWidth) + 'px');

        var $dataBox = $('<div class="dataBox"/>');
        $dataBox.text(item.name);
        $dataBox.attr('key', item.id);
        if (item.name == null) {
          $dataBox.css('background', 'transparent');
        }

        $grid.append($dataBox);

        $('.levelFloor[index="' + level + '"]').append($grid);
      }
    }


    // createLine
    for (var i = 0; i < items.length; i++) {
      var level = items[i];
      for (var j = 0; j < level.length; j++) {
        var single = level[j];
        var sourceName = single.id;
        var startPos = $('.dataBox[key="' + sourceName + '"]').offset();
        for (var k = 0; k < single.target.length; k++) {
          var targetKey = single.target[k];

          if (targetKey) {
            var targetPos = $('.dataBox[key="' + targetKey + '"]').offset();


            var pos = 'M ' + (startPos.left + 50) + ' ' + (startPos.top + 40) + ' L ' + (targetPos.left + 50) + ' ' + (targetPos.top + 40) + ' Z';

            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pos);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-width', "0.3");
            path.setAttribute('stroke', 'black');
            path.setAttribute('info', targetKey + ' : ' + sourceName);

            var svg = document.getElementById('graphSvg')
            svg.appendChild(path);
          }
        }
      }
    }
  }

  return {
    createTree: function(data){
      var maxWidth = 0;
      for(var idx = 0; idx < data[0].length; idx++){
        maxWidth += data[0][idx].grid;
      }


      createBox(data.length);
      createTree(data, maxWidth);
      }
  }

}(global))
