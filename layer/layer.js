function tab(num = 1){
  return "&nbsp;".repeat(num*4)
}
function value(id){
  return document.getElementById(id).value
}

function generate(event) {
  let upgradeMessage = `
  ${tab(1)} upgrades: &#123<br>
  ${tab(2)}   11: &#123<br>
  ${tab(3)}     title: &quot(title)&quot,<br>
  ${tab(3)}     description: &quot(description)&quot,<br>
  ${tab(3)}     cost: new Decimal(your cost),<br>
  ${tab(3)}     unlocked() &#123; return (your requirements) &#125;,<br>
  ${tab(3)}     effect() &#123; return (your effect) &#125;,<br>
  ${tab(3)}     effectDisplay() &#123; return format(this.effect()) + "x" &#125;,<br>
  ${tab(2)}   &#125,<br>
  ${tab(1)} &#125;,<br>
  `
  let milestoneMessage = `
  ${tab(1)} milestones: &#123;<br>
  ${tab(2)}   0: &#123;<br>
  ${tab(3)}     requirementDescription: &quot(your requirement description)&quot,<br>
  ${tab(3)}     done() &#123;{return (your done requirement)&#125;,<br>
  ${tab(3)}     effectDescription: &quot(describe the reward)&quot,<br>
  ${tab(3)}     &#125,<br>
  ${tab(2)}   &#125,<br>
  `
  let buyableMessage = `
  ${tab(1)}buyables:{<br>
  ${tab(2)}  11: {<br>
  ${tab(3)}    cost(x = getBuyableAmount(this.layer, this.id)) {<br>
  ${tab(4)}       var c = (formula,where x is next value)<br>
  ${tab(4)}       return c<br>
  ${tab(3)}    },<br>
  ${tab(3)}    display() {return &lsquo;(description)&lsaquo;br />$&#123;format(buyableEffect(this.layer,this.id),2)}.(Next:$&#123;format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}})&lsaquo;br />Cost: $&#123;format(this.cost(getBuyableAmount(this.layer, this.id)))} (Resource name)&lsaquo; br>Level:$&#123;formatWhole(getBuyableAmount(this.layer, this.id))}	&lsquo; },<br>
  ${tab(3)}    canAfford() { return player.b.points.gte(this.cost()) },<br>
  ${tab(3)}    buy() {<br>
  ${tab(4)}       player.(layer).points = player.(layer).points.sub(this.cost())<br>
  ${tab(4)}       setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))<br>
  ${tab(3)}    },<br>
  ${tab(3)}    effect(x = getBuyableAmount(this.layer, this.id)){<br>
  ${tab(4)}       var eff = (formula,where x is current value)<br>
  ${tab(4)}       return eff<br>
  ${tab(3)}    },<br>
  ${tab(3)}    unlocked(){return player.t.best.gt(0)},<br>
  ${tab(2)}  },<br>
  ${tab(1)}},<br>
  `
  
 
  event.preventDefault();
  upgradesEnabled = document.getElementById("upgrades").value
  milestonesEnabled = document.getElementById("milestones").value
  buyablesEnabled = document.getElementById("buyables").value
  //console.log(upgradesEnabled)
  var data = [];
  $('#layer-form').serializeArray().forEach( function(option){
    data[option['name']] = option['value'];
  })
  
  var layerinfo = `
<p>
addLayer(&quot${data.layername}&quot, &#123;<br>
${tab(1)}  name: &quot${data.oflayername}&quot,<br>
${tab(1)}  symbol: &quot${data.symbol}&quot,<br>
${tab(1)}  position: 0, <br>
${tab(1)}  startData() &#123; return &#123;<br>
${tab(2)}    unlocked: ${(document.getElementById("unlocked").value)},<br>
${tab(2)}    points: new Decimal(${data.startpoints}),<br>
${tab(1)}  &#125;&#125;,<br>
${tab(1)}  color: &quot${data.lcolor}&quot,<br>
${tab(1)}  requires: ${data.requires},<br>
${tab(1)}  resource: &quot${data.resource}&quot,<br>
${tab(1)}  baseResource: &quot${data.baseresource}&quot,<br>
${tab(1)}  baseAmount() &#123;return player.${(data.baselayer?data.baselayer+".":"")+data.baseresource}&#125;,<br>
${tab(1)}  type: &quot${(document.getElementById("type").value)}&quot,<br>
${tab(1)}  exponent: ${data.exponent},<br>
${tab(1)}  gainMult() &#123;<br>
${tab(2)}    mult = new Decimal(1) // Calculate the multiplier for main currency from bonuses<br>
${tab(2)}    return mult<br>
${tab(1)}  &#125;,<br>
${tab(1)}  gainExp() &#123;<br>
${tab(2)}    return new Decimal(1) // Calculate the exponent on main currency from bonuses<br>
${tab(1)}  &#125,<br>
${tab(1)}  row: ${data.layerrow},<br>
${tab(1)}  layerShown() &#123;return ${(document.getElementById("layershown").value)}&#125;,<br>
`
if(upgradesEnabled == "true"){
	layerinfo += upgradeMessage
}
if(milestonesEnabled == "true"){
	layerinfo += milestoneMessage
}
if(buyablesEnabled == "true"){
	layerinfo += buyableMessage
}
closingmessage = `
&#125;)
</p>
`
layerinfo += closingmessage
  
  $('#output').html(layerinfo);
}

function update(){
  generate()
}

setInterval(update,50)