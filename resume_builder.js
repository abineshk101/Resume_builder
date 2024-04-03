let resume_detail={}
let temp={}
function val(get_info,key_name){
  if(key_name){
    if(resume_detail[key_name]){
      resume_detail[key_name]={...resume_detail[key_name]}
    }else{
      resume_detail[key_name]={}
    }resume_detail[key_name][get_info.name]=get_info.value
  }
  else{
    resume_detail[get_info.name]=get_info.value
  }
  display()
}

function add_item(key_name,id,tbl_id,edu_info,exp_info){
  if(exp_info){
    if(!resume_detail[exp_info]){
      resume_detail[exp_info]=[]
    }
      resume_detail[exp_info].push(temp)
      let keyss=Object.keys(temp)
      for(i=0;i<keyss.length;i++){
        document.getElementById(keyss[i]).value=""
      }
    temp={}
    let ans=""
    for(i=0;i<resume_detail[exp_info].length;i++){
      let a=resume_detail[exp_info][i].company_name
      let b=resume_detail[exp_info][i].position
      let c=resume_detail[exp_info][i].years
      ans=ans+`<tr id="experi${i}"><td>${a}</td>
                                      <td>${b}</td>
                                      <td>${c}</td>
                                      <td><button type="button" class="btn btn-primary" onclick="del_exp('${exp_info}','${i}')">remove</button></td></tr>`
    }document.getElementById("exp_tbl").innerHTML=ans
  }
  else if(edu_info){
    if(!resume_detail[edu_info]){
      resume_detail[edu_info]=[]
    }
      resume_detail[edu_info].push(temp)
      let keyss=Object.keys(temp)
      for(i=0;i<keyss.length;i++){
        document.getElementById(keyss[i]).value=""
      }
    temp={}
    let ans=""
    for(i=0;i<resume_detail[edu_info].length;i++){
      let a=resume_detail[edu_info][i].institute_name
      let b=resume_detail[edu_info][i].level
      let c=resume_detail[edu_info][i].year
      let d=resume_detail[edu_info][i].percentage
      ans=ans+`<tr id="${edu_info[i]}"><td>${a}</td>
                                      <td>${b}</td>
                                      <td>${c}</td>
                                      <td>${d}</td>
                                      <td><button type="button" class="btn btn-primary" onclick="del(${null},'${edu_info}','${i}')">remove</button></td></tr>`
    }document.getElementById("edu_tbl").innerHTML=ans
    display()
  }else{
  if(key_name){
    if(!resume_detail[key_name]){
      resume_detail[key_name]=[]
    }
  }resume_detail[key_name].push(document.getElementById(id).value)
  document.getElementById(id).value=""
  let htmldata=""
  for(i=0;i<resume_detail[key_name].length;i++){
    htmldata=htmldata+`<div id="${key_name[i]}" class="alert alert-danger"><button type="button" class="btn btn-primary" onclick="del('${resume_detail[key_name][i]}','${key_name}','${i}')">remove</button><ol>${resume_detail[key_name][i]}</ol></div>`
  }document.getElementById(tbl_id).innerHTML=htmldata}
  display()
}

function del(get_item,key_name,idx){
  if(!get_item){
    let removed_obj=[]
    for(i=0;i<resume_detail[key_name].length;i++){
      if(i!=idx){
        removed_obj.push(resume_detail[key_name][i])
      }
    }
    resume_detail[key_name]=removed_obj
    display()

  }else
  {
  let skl=[]
  for(i=0;i<resume_detail[key_name].length;i++){
    if(resume_detail[key_name][i]!=get_item){
      skl.push(resume_detail[key_name][i])
    }
  }
  resume_detail[key_name]=skl
  display()
  }
  result=document.getElementById(key_name[idx])
  result.remove()
  display()
}

function del_exp(exp_info,idx){
  let removed_obj=[]
  for(i=0;i<resume_detail[exp_info].length;i++){
    if(i!=idx){
      removed_obj.push(resume_detail[exp_info][i])
    }
  }resume_detail[exp_info]=removed_obj
  result=document.getElementById(`experi${idx}`)
  result.remove()
  display()
}

function add_edu(got){
  temp[got.name]=got.value
}

function display(){
  document.getElementById("show").innerHTML=JSON.stringify(resume_detail)
  }

function sent_ajx(){
  console.log(resume_detail)
  $.ajax({
    type:"post",
    url:"http://agaram.academy/api/action.php",
    data:{
      request :"create_resume",
      user :"abinesh",
      resume:resume_detail
    },
    success:function(show){
      console.log(show)
    },
    error:function(error){
      confirm.log(error)
    }
  })
}

function redirect(){
  window.location="list.html"
}

function get_ajx(){
  $.ajax({
    type:"get",
    url:"http://agaram.academy/api/action.php",
    data:{
      request :"get_user_resume",
      user :"abinesh"
    },
    success:function(show){
      list1=JSON.parse(show).data
      id_name=""
      for(i=0;i<list1.length;i++){
        console.log(list1[i])
        id_name=id_name+`<tr>
                            <td>${list1[i].id}</td>
                            <td>${list1[i].user}</td>
                            <td><button type="button" onclick="del_ajx('${list1[i].id}')" class="btn btn-success">remove</button></td>
                            <td><a href="resume template 3/resume_3.html?id=${list1[i].id}"><img src="/home/abinesh/agaram/Agaram/D47-20231005/resume builder/resume template 3/resume-cv-design-1.png"></a></td>
                            <td><a href="resume template 2/resume_2.html?id=${list1[i].id}"><img src="/home/abinesh/agaram/Agaram/D47-20231005/resume builder/resume template 2/resume_01.jpg"></a></td>
                            <td><a href="resume template 4/resume_4.html?id=${list1[i].id}"><img src="/home/abinesh/agaram/Agaram/D47-20231005/resume builder/resume template 4/free-resume-html.png"></a></td>

                          <tr>`
      }
      document.getElementById("tbl").innerHTML=id_name
      console.log(JSON.parse(show))
    },
    error:function(error){
      console.log("error",error)
    }
  })
  
}

function del_ajx(user_id){
  $.ajax({
    type:"get",
    url:"http://agaram.academy/api/action.php",
    data:{
      request :"delete_user_resume",
      user :"abinesh",
      id:user_id
    },
    success:function(content){
      get_ajx()
    },
    error:function(error){
      console.log(error)
    }
  })
}

function show_resume(){
  const queryString = window.location.search;
  const getparam=new URLSearchParams(queryString);
  let id=getparam.get('id')
  $.ajax({
    type:"get",
    url:"http://agaram.academy/api/action.php",
    data:{
      request :"get_resume_by_id",
      user :"abinesh",
      id:id
    },
    success:function(response){
      let res=JSON.parse(response)
      let taken=JSON.parse(res.data.data)
          let input_name=taken.name
          $('#resume_name').html(input_name)

          let input_objective=taken.objective
          $('#resume_objective').html(input_objective)
          let input_email=taken.email
          $('#resume_email').html(input_email)
          let input_number=taken.number
          $('#resume_number').html(input_number)
          // let input_fthr_name=taken.personal_details.father_name
          // let input_mthr_name=taken.personal_details.mother_name
          let input_address=taken.personal_details.address
          $('#resume_address').html(input_address)
          let input_district=taken.personal_details.district
          $('#resume_dist').html(input_district)
          let input_skills=taken.skills
          let skill_data=""
          for(i=0;i<input_skills.length;i++){
            skill_data=skill_data+`<ol><b>&#10146;</b> ${input_skills[i]}</ol>`
          }$('#prgrm_skill').html(skill_data)

          let input_lang=taken.languages
          let lang_data=""
          for(i=0;i<input_lang.length;i++){
            lang_data=lang_data+`<ol><b>&#10146;</b> ${input_lang[i]}</ol>`
          }$('#lang_order').html(lang_data)

          let input_edu=taken.education
          let edu_data="<thead><tr><th>Institute Name</th><th>Level</th><th>percentage</th><th>year</th></tr></thead>"
          for(i=0;i<input_edu.length;i++){
            edu_data=edu_data+`<tr>
                                  <td>${input_edu[i].institute_name}</td>
                                  <td>${input_edu[i].level}</td>
                                  <td>${input_edu[i].percentage}</td>
                                  <td>${input_edu[i].year}</td>
                                  </tr>`  
          }$('#resume_edu').html(edu_data)

          let input_exp=taken.experience
          let exp_data="<thead><tr><th>Company Name</th><th>position</th><th>years</th></tr></thead>"
          for(i=0;i<input_exp.length;i++){
            exp_data=exp_data+`<tr>
                                  <td>${input_exp[i].company_name}</td>
                                  <td>${input_exp[i].position}</td>
                                  <td>${input_exp[i].years}</td>
                                  </tr>`  
          }$('#resume_exp').html(exp_data)

          let input_hob=taken.hobbies
          let hob_data=""
          for(i=0;i<input_hob.length;i++){
            hob_data=hob_data+`<ol><b>&#9658;</b> ${input_hob[i]}</ol>`
          }$('#resume_hobby').html(hob_data)
        }
      }
    )
}

function download(){
  const page=document.getElementById('whole_resume')
  var opt={
    margin:0,
    filename:'Demo pdf',
    image:{type:'jpeg',quality:0.98},
    html2canvas:{scale:2},
    jsPDF:{unit:'in',format:'letter',orientation:'portrait'}
  }
  html2pdf().set(opt).from(page).save();
}
