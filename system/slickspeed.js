var SlickSpeed = (function() {
  var timer = null;
  var tests = [];
  var score = {};
	var scores = {};
  
  function forEach(iterable, fn, bind){
  	for (var i = 0, j = iterable.length; i < j; i++) fn.call(bind, iterable[i], i, iterable);
  };
  
  function buildFrames() {
    var frame_container = document.getElementById('frames');
    forEach(SlickSpeed.frameworks, function(framework) {
      var iframe = document.createElement('IFrame');
      iframe.setAttribute('name',framework.name);
      var src = 'template.html?framework='
              + framework.name
              + '&nocache='
              + Math.random();
      iframe.setAttribute('src',src);
      frame_container.appendChild(iframe);
    });
  };
  
  function testRunner(){
		var test = tests.shift();
		if (!test) return;
		var results = test.execute(test.selector);
		test.cell.className = 'test';
		test.cell.innerHTML = results.time + ' ms | ' + results.found + ' found';
		test.cell.speed = results.time;
		if (results.error){
			test.cell.innerHTML = results.time + ' ms | <span class="exception" title="' + results.error + '">error returned</a>';
			test.cell.className += ' exception';
			test.cell.found = 0;
			test.cell.error = true;
		} else {
			test.cell.found = results.found;
			test.cell.error = false;
		}

		score[test.name] += test.cell.speed;
		scores[test.name].innerHTML =  '&nbsp;' + score[test.name] + '&nbsp;';

		if (test.cell == test.row.lastChild) _colourRow(test.row);
		timer = setTimeout(testRunner, 100);
	};
  
  function _colourRow(row){

		var cells = [];

		var tds = row.getElementsByTagName('td');
		forEach(tds, function(td){
			cells.push(td);
		});

		var speeds = [];

		forEach(cells, function(cell, i){
			if (!cell.error) speeds[i] = cell.speed;
			//error, so we exclude it from colouring
			else speeds[i] = 99999999999999999999999;
		});

		var min = Math.min.apply(this, speeds);
		var max = Math.max.apply(this, speeds);

		var found = [];
		var mismatch = false;
		forEach(cells, function(cell, i){
			found.push(cell.found);
			if (!mismatch){
				forEach(found, function(n){
					if (cell.found && n && cell.found != n){
						mismatch = true;
						return;
					}
				});
			}
			if (cell.speed == min) cell.className += ' good';
			else if (cell.speed == max) cell.className += ' bad';
			else cell.className += ' normal';
		});

		if (mismatch){
			forEach(cells, function(cell, i){
				if (cell.found) cell.className += ' mismatch';
			});
		}

	};
  
  function load(){
  	forEach(SlickSpeed.frameworks, function(f){
  		f.test = window.frames[f.name].SlickSpeed.test
  		f.selectors = []
  	});
    
  	var tbody = document.getElementById('tbody');
  	var tfoot = document.getElementById('tfoot');
  	var lastrow = tfoot.getElementsByTagName('tr')[0];

  	var controls = document.getElementById('controls');

  	var links = controls.getElementsByTagName('a');

  	var start = links[1];
  	var stop = links[0];

  	start.onclick = function(){
  		testRunner();
  		return false;
  	};

  	stop.onclick = function(){
  		clearTimeout(timer);
  		timer = null;
  		return false;
  	};

  	var frxi = 0;
  	forEach(SlickSpeed.frameworks, function(f){
  		forEach(SlickSpeed.selectors, function(selector){
  			f.selectors.push(selector);
  		});
  		scores[f.name] = lastrow.getElementsByTagName('td')[frxi];
  		score[f.name] = 0;
  		frxi++;
  	});
  	forEach(SlickSpeed.selectors, function(selector, i){
  		var frxi = 0;
  		var row = tbody.getElementsByTagName('tr')[i];
  		forEach(SlickSpeed.frameworks, function(f) {
  			var cell = row.getElementsByTagName('td')[frxi];
  			tests.push({
  				'execute': f.test,
  				'selector': f.selectors[i],
  				'name': f.name,
  				'row': row,
  				'cell' : cell
  			});
  			frxi++;
  		});
  	});
  };
  
  return {
    frameworks: window.frameworks,
    selectors: window.selectors,
    forEach: forEach,
    buildFrames: buildFrames,
    load: load
  };
})();

window.onload = SlickSpeed.load;