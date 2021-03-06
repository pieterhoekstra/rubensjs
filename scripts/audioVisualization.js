requirejs([
    'util/uri',
    'rubensjs/types',
    'rubensjs/OBJ/columnChart'], function(URI, R, L){

        window.addEventListener('popstate', onPopState);

        // The idea is to visualize sound with the amplitude
        // as a byte from a PCM_8BIT encoding ranging from 0-255
        // This script responds to a url with #value appended.
        // so: page.html#127 indicates a volume of half of the maximum.
        var graph = new L.ColumnChart("chart1", 18, '#000', '#fff')

        graph.init({
            paddingLeft:150,
            paddingRight:150,
            paddingTop:50,
            paddingBottom:50,
            padding:0,
            fontSize:18,
            halfFontXHeight:8,
            opts: {
                dir:1,
                mode:0
            }
        })

        graph.drawOrigin = false

        graph.setRange(new R.Range(0,1,0,Math.pow(2,8)-1));

        graph.setSteps(1,1)

        graph.drawAxis(true)

        function onPopState(){

            var val = new URI.URI().uri

            graph.invalidate();

            var data = [{label:null, row:0, data:[{to:parseInt(val)}]}]
            graph.setData([data])

            graph.D.openGroup('svgLayer')

            graph.drawData()

            graph.D.closeGroup('svgLayer')

        }

        onPopState()

})