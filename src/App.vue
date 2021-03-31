<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #f7f8fd;
  font-size: 14px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  margin-right: 2px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: #d5d5e6;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 6px;
  background: #f5f5f9;
}

.router-view {
  flex: 1;
  padding: 10px;
  overflow: auto; 
}

.router-view {
    flex: 1;
    padding: 10px;
    overflow: auto;
    /*滚动条样式*/
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px;
      margin-right: 2px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: #d5d5e6;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 6px;
      background: #f5f5f9;
    }
  }

.container {
  padding: 10px;
  width: 1146px;
  box-sizing: border-box;
  color: #1a1d2c;
  min-height: 100%;
  margin: 0 auto;
  position: relative;
}
// 样式重置
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  word-break: break-word;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
small {
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  word-break: break-word;
}
a:hover {
  text-decoration: underline;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
}
</style>
