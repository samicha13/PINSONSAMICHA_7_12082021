
<template>
  <router-view />
</template>

<style>
* 
{
  font-family: 'Roboto', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app 
{
  max-width: 100%;
}
.one-post
{
  margin-bottom: 20px;
}
h2,h1
{
  margin-bottom: 10px;
  color: #192A48;
  font-size: 1.5em;
}
body 
{
  background-image: linear-gradient(to bottom right, #89a8ff, #e4e8ff);
  display: flex;
  justify-content: center;
  padding: 0% 5%;
  min-height: 100vh;
}
.centerLogo
{
  display:flex;
  justify-content:center;
}
  input::placeholder 
{
  color: #787878;
}
.form-row 
{
  display: flex;
  margin: 16px 0px;
  flex-wrap: wrap;
}
.form-row__input 
{
  padding:9px;
  border: none;
  border-radius: 12px;
  background:#e5e5e5;
  font-weight: 500;
  font-size: 20px;
  flex:1;
  min-width: 100px;
}
img 
{
  width:500px;
  max-width: 100%;
  border-radius:20px;
  margin-bottom: 10px;
}

.content
{
  display: flex;
  flex-wrap:wrap;
  justify-content:space-around;
  font-size:20px;
}


.card 
{
  max-width: 100%;
  width: 900px;
  background:#425b8A;
  border-radius: 20px;
  padding:32px;
  margin-top: 100px;
}
.card__title 
{
  text-align:center;
  font-weight: 800;
  color: white;
}
.card__subtitle 
{
  text-align: center;
  color:white;
  font-size: 20px;
}
.button 
{
  background: #77B5FE;
  color:white;
  border-radius: 12px;
  font-weight: 800;
  font-size: 24px;
  border: none;
  width: 100%;
  padding: 11px;
}

.card__action 
{
  color:white;
  font-style:italic;
  font-weight:700;
  text-decoration: underline #2196F3 3.5px;
}
.card__action:hover 
{
  cursor:pointer;
}
.button:hover 
{
  cursor:pointer;
  
}
.error
{
  color:white;
  font-size: 1.4em;
  font-weight:800;
}
</style>