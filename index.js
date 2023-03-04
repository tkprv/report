const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios')
// const path = require('path')
// const readXlsxFile = require('read-excel-file/node')
// const multer = require('multer')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: "3307",
  dateStrings: 'date'
})

db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database = ', err)
    return;
  }
  console.log('MySQL successfully connected!');
})

app.post("/apilogin", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const scopes = req.body.scopes
  token = 'nK6p0wT-8NVHUwB8p0e9QSYBSaIZGp9D'
  const newdata = { username: username, password: password, scopes: scopes }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }
  axios.post('https://api.account.kmutnb.ac.th/api/account-api/user-authen', newdata, config,)
    .then((response) => {
      //  res.status(201).json(response.data.api_status)
      if (response.data.api_status === 'success') {
        db.query('SELECT * FROM tbl_user WHERE username = ? AND email = ?', [response.data.userInfo.username, response.data.userInfo.email], (err, results) => {
          if (err) {
            res.send({ err: err })
          }
          if (results.length > 0) {
            res.send(results)
          } else {
            response.send('Incorrect Email Address');
          }

        })
      } else {
        res.status(201).json(response.data)
      }
    })

})

app.post("/api", (req, res) => {
  const username = req.body.username
  token = 'nK6p0wT-8NVHUwB8p0e9QSYBSaIZGp9D'
  const data = { username: username }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }
  axios.post('https://api.account.kmutnb.ac.th/api/account-api/user-info', data, config)
    .then((response) => {
      //receive response
      console.log(response.data);
      res.status(201).json(response.data);

    })

});

app.post('/auth', function (request, response) {
  // Capture the input fields
  console.log(request.body)
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query('SELECT * FROM tbl_user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        //response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get("/person", (req, res) => {
  db.query("SELECT * FROM tbl_user LEFT JOIN tbl_section on tbl_user.section_id = tbl_section.section_id ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/newuser", (req, res) => {
  db.query("SELECT * FROM tam ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/agency", (req, res) => {
  db.query("SELECT * FROM tbl_section", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.post("/createagency", (req, res) => {
  const section_name = req.body.section_name;
  db.query(
    "INSERT INTO tbl_section (section_name,section_flag) VALUES (?,1)",
    [section_name],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('name', section_name)
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log('4', err);
      } else {
        res.send(result);
      }
    }
  );
});



app.put("/updateagency/:section_id", (req, res) => {
  const section_id = req.params.section_id;
  const section_name = req.body.section_name;
  db.query(
    "UPDATE tbl_section SET section_name = ?  WHERE section_id = ?",
    [section_name, section_id],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('ghhjj', section_id)
  console.log('ghjj', section_name)
})

app.post("/create", (req, res) => {
  const secid = req.body.section_id
  const user = req.body.username
  const pas = req.body.password
  const fname = req.body.fname
  const lname = req.body.lname
  const telno = req.body.telno
  const email = req.body.email
  const director = req.body.director
  const manager = req.body.manager
  const supervisor = req.body.supervisor
  const supplies = req.body.supplies
  const responsible = req.body.responsible
  const admin = req.body.admin
  const flag = req.body.flag
  console.log(req.body)
  db.query(
    "INSERT INTO tbl_user (section_id,username,password,fname,lname,telno,email,director,manager,supervisor,supplies,responsible,admin,flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [secid, user, pas, fname, lname, telno, email, director, manager, supervisor, supplies, responsible, admin, flag],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  // console.log('name',section_name)
});

app.put("/updateuser/:ID", (req, res) => {
  const id = req.params.ID;
  const secid = req.body.section_id
  const director = req.body.director
  const manager = req.body.manager
  const supervisor = req.body.supervisor
  const supplies = req.body.supplies
  const responsible = req.body.responsible
  const admin = req.body.admin
  db.query(
    "UPDATE tbl_user SET section_id = ? ,director = ? ,manager = ? ,supervisor = ? ,supplies = ? ,responsible = ? ,admin = ?   WHERE user_id = ?",
    [secid, director, manager, supervisor, supplies, responsible, admin, id],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('id', id)
  console.log('secid', secid)
  console.log('director', director)
  console.log('manager', manager)
  console.log('supervisor', supervisor)

})

app.delete("/delete/:p_id", (req, res) => {
  const p_id = req.params.p_id;
  db.query("DELETE FROM tbl_user WHERE user_id = ?", p_id, (err, result) => {
    if (err) {
      console.log('2', err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete2/:a_id", (req, res) => {
  const a_id = req.params.a_id;
  db.query("DELETE FROM tbl_section WHERE section_id = ?", a_id, (err, result) => {
    if (err) {
      console.log('1', err);
    } else {
      res.send(result);
    }
  });
});
/////ยุท ปีงบ
app.get("/strategic", (req, res) => {
  db.query("SELECT * FROM tbl_fiscalyear ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createstrategic", (req, res) => {
  const year = req.body.fiscalyear
  const plan = req.body.plan_name
  db.query(
    "INSERT INTO tbl_fiscalyear (fiscalyear,plan_name,flag) VALUES (?,?,1)",
    [year, plan],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('ghhjj', year)
  console.log('ghjj', plan)

});

app.delete("/deletestrategic/:f_id", (req, res) => {
  const delete_id = req.params.f_id;
  db.query("DELETE FROM tbl_fiscalyear WHERE fiscalyear_id = ?", delete_id, (err, result) => {
    if (err) {
      console.log('1', err);
    } else {
      res.send(result);
    }
  });
  console.log('ghjj', delete_id)
});

app.put("/updatestrategic/:f_id", (req, res) => {
  const ID = req.params.f_id
  const name = req.body.plan_name
  const time1 = req.body.director_of_time
  const date1 = req.body.director_of_date
  const time2 = req.body.ref_of_time
  const date2 = req.body.ref_of_date
  db.query(
    "UPDATE tbl_fiscalyear SET plan_name = ? , director_of_time= ? , director_of_date= ? , ref_of_time= ? , ref_of_date= ?  WHERE fiscalyear_id = ?",
    [name, time1, date1, time2, date2, ID],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )

})

app.put("/updatesstatus/:ID", (req, res) => {
  const ID = req.params.ID;
  const flag = req.body.flag;
  db.query(
    "UPDATE tbl_fiscalyear SET flag = ?  WHERE fiscalyear_id = ?",
    [flag, ID],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )

})

////ประเด็นยุท
app.get("/strategicid", (req, res) => {
  db.query("SELECT * FROM  tbl_strategic LEFT JOIN tbl_fiscalyear on tbl_strategic.fiscalyear_id = tbl_fiscalyear.fiscalyear_id ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/deletestid/:ID", (req, res) => {
  const delete_id = req.params.ID;
  db.query("DELETE FROM tbl_strategic WHERE strategic_id = ?", delete_id, (err, result) => {
    if (err) {
      console.log('1', err);
    } else {
      res.send(result);
    }
  });
  console.log('ghjj', delete_id)
});

app.post("/createstid", (req, res) => {
  const year = req.body.fiscalyear_id
  const order = req.body.order_strategic
  const name = req.body.strategic_name
  db.query(
    "INSERT INTO tbl_strategic (fiscalyear_id,order_strategic,strategic_name) VALUES (?,?,?)",
    [year, order, name],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('ghhjj', year)
  console.log('ghjj', order)
  console.log('ghjj', name)

});
app.put("/updatest/:ID", (req, res) => {
  const ID = req.params.ID;
  const name = req.body.strategic_name;
  db.query(
    "UPDATE tbl_strategic SET strategic_name = ?  WHERE strategic_id = ?",
    [name, ID],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('2', ID)
  console.log('2', name)
})
////////ข้อมูลประเด็นยุธ .strategic_id JOIN tbl_indic_goal ON tbl_goal.goal_id = tbl_indic_goal.goal_id JOIN tbl_tactic ON tbl_indic_goal.goal_id = tbl_tactic.goal_id 
app.get("/datast/:id", (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM tbl_strategic JOIN tbl_goal ON tbl_strategic.strategic_id = tbl_goal.strategic_id JOIN tbl_indic_goal ON tbl_goal.goal_id = tbl_indic_goal.goal_id JOIN tbl_tactic ON tbl_goal.goal_id  = tbl_tactic.goal_id WHERE tbl_strategic.strategic_id  = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

  console.log('jj', id)
});


/////เป้าปรสงค์กลยุทธ
app.get("/goaal:id", (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM  tbl_goal WHERE tbl_goal.strategic_id  = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/goal", (req, res) => {
  // const id = req.params.id
  db.query("SELECT * FROM  tbl_goal", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//เพิ่ม
app.post("/creategoal", (req, res) => {
  const strategic_id = req.body.strategic_id
  const order = req.body.order_goal
  const name = req.body.goal_name
  db.query(
    "INSERT INTO tbl_goal (strategic_id,order_goal,goal_name) VALUES (?,?,?)",
    [strategic_id, order, name],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }
    }
  );
  console.log('strategic_id', strategic_id)
  console.log('order', order)
  console.log('name', name)

});

app.get("/indic", (req, res) => {
  db.query("SELECT * FROM  tbl_indic_goal LEFT JOIN tbl_goal ON tbl_indic_goal.goal_id = tbl_goal.goal_id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  });
});
//ตัวชี้วัด 
app.post("/createindicgoal", (req, res) => {
  const goalid = req.body.goal_id
  const order = req.body.order_indic_goal
  const indicgoal = req.body.indic_goal
  const unit = req.body.unit
  const cost = req.body.cost
  //
  db.query(
    "INSERT INTO tbl_indic_goal(goal_id,order_indic_goal,indic_goal,unit,cost) VALUES (?,?,?,?,?)",
    [goalid, order, indicgoal, unit, cost],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }
    }
  );



});
/////กลยุท
app.get("/tactic", (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM tbl_tactic JOIN tbl_goal ON tbl_tactic.goal_id = tbl_goal.goal_id", (err, result) => {

    // db.query("SELECT * FROM tbl_tactic JOIN tbl_indic_goal ON tbl_tactic.goal_id = tbl_indic_goal.goal_id JOIN tbl_goal ON tbl_tactic.goal_id = tbl_goal.goal_id JOIN tbl_strategic JOIN tbl_goal ON tbl_strategic.strategic_id = tbl_goal.strategic_id  WHERE tbl_goal.strategic_id = ? ",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  console.log('jj', id)
});

app.get("/tactic2:id", (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM  tbl_tactic WHERE tbl_tactic.goal_id  = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createtactic", (req, res) => {
  const goalid = req.body.goal_id
  const ordertactic = req.body.order_tactic
  const name = req.body.tactic_name

  db.query(
    "INSERT INTO tbl_tactic(goal_id,order_tactic,tactic_name) VALUES (?,?,?)",
    [goalid, ordertactic, name],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('goalid', goalid)
  console.log('ordertactic', ordertactic)
  console.log('name', name)
});

//แก้ไขเป้าประสงค์ ตัวชี้วัด ค่าเป้าหมาย หน่วยนับ กลยุทธ์
app.get('/showgoal/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_goal WHERE goal_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updategoal/:id', (req, res) => {
  const ID = req.params.id;
  const goalname = req.body.goal_name;
  db.query(
    "UPDATE tbl_goal SET goal_name = ? WHERE goal_id = ?",
    [goalname, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('goal', ID)
  console.log('newgoal', goalname)
})

app.get('/showindic/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_indic_goal WHERE indic_goal_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateindic/:id', (req, res) => {
  const ID = req.params.id;
  const indicgoal = req.body.indic_goal;
  const unit = req.body.unit;
  const cost = req.body.cost;
  db.query(
    "UPDATE tbl_indic_goal SET indic_goal = ?, unit = ?, cost = ? WHERE indic_goal_id = ?",
    [indicgoal, unit, cost, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('indic', ID)
  console.log('newindic', indicgoal)
  console.log('unit', ID)
  console.log('newunit', unit)
  console.log('cost', ID)
  console.log('newcost', cost)
})

app.get('/showtactic/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_tactic WHERE tactic_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatetactic/:id', (req, res) => {
  const ID = req.params.id;
  const tacticname = req.body.tactic_name;
  db.query(
    "UPDATE tbl_tactic SET tactic_name = ? WHERE tactic_id = ?",
    [tacticname, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('tactic', ID)
  console.log('newtactic', tacticname)
})

app.get('/fiscalyear', (req, res) => {
  db.query("SELECT * FROM tbl_fiscalyear", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/project', (req, res) => {
  db.query("SELECT * FROM tbl_project", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/fiscalyearandplannameproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_fiscalyear WHERE fiscalyear_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    });
});

app.get('/sectionproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_section WHERE section_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
})

app.get('/userproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT tbl_user_project.user_project_id, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname FROM tbl_user_project LEFT JOIN tbl_project ON tbl_user_project.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_user_project.user_id = tbl_user.user_id WHERE tbl_user_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.get('/strategicproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_strategic WHERE strategic_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
});

app.get('/goalproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_goal WHERE goal_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
});

app.get('/tacticproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_tactic WHERE tactic_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
});

app.get('/integrationproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_integration WHERE integration_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
});

app.get('/objectiveproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT tbl_project.project_id, tbl_objective.objective_id, tbl_objective.objective_name FROM tbl_objective LEFT JOIN tbl_project ON tbl_project.project_id = tbl_objective.project_id WHERE tbl_objective.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.get('/indicproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT tbl_indic_project.indic_project_id, tbl_indic_project.indic_project, tbl_indic_project.unit, tbl_indic_project.cost, tbl_project.project_id FROM tbl_indic_project LEFT JOIN tbl_project ON tbl_project.project_id = tbl_indic_project.project_id WHERE tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.get('/stepproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT tbl_step.step_id, tbl_step.step_name, tbl_step.start, tbl_step.stop, tbl_project.project_id FROM tbl_step LEFT JOIN tbl_project ON tbl_step.project_id = tbl_project.project_id WHERE tbl_step.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.get('/workplanproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT * FROM tbl_workplan WHERE workplan_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log('11', err)
      } else {
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          res.send(row)
        })
      }
    }
  )
});

app.get('/chargesproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT tbl_charges.charges_id, tbl_charges.charges_name_head, tbl_charges.charges_name, tbl_charges.quarter_one, tbl_charges.quarter_two, tbl_charges.quarter_three, tbl_charges.quarter_four, tbl_project.project_id FROM tbl_charges LEFT JOIN tbl_project ON tbl_charges.project_id = tbl_project.project_id WHERE tbl_charges.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.get('/benefitproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT tbl_benefit.benefit_id, tbl_benefit.benefit_name, tbl_project.project_id FROM tbl_benefit LEFT JOIN tbl_project ON tbl_benefit.project_id = tbl_project.project_id WHERE tbl_benefit.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.put('/confirmproject/:id', (req, res) => {
  const ID = req.params.id;
  const status = req.body.status;
  db.query(
    "UPDATE tbl_project SET status = ? WHERE project_id = ?",
    [status, ID],
    (err, result) => {
      if (err) {
        console.log('11', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('status', ID)
  console.log('newstatus', status)
})

app.put('/noconfirmproject/:id', (req, res) => {
  const ID = req.params.id;
  const status = req.body.status;
  db.query(
    "UPDATE tbl_project SET status = ? WHERE project_id = ?",
    [status, ID],
    (err, result) => {
      if (err) {
        console.log('12', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('status', ID)
  console.log('newstatus', status)
})

app.get('/showcomment', (req, res) => {
  db.query("SELECT * FROM tbl_comment", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/comment', (req, res) => {
  const project = req.body.project_id
  const user = req.body.user_id
  const comment = req.body.comment;
  const comment_level = req.body.comment_level
  const time_comment = req.body.time_comment
  const date_comment = req.body.date_comment
  const comment_type = req.body.comment_type
  console.log('comment', req.body)
  db.query("INSERT INTO tbl_comment (project_id, user_id, comment, comment_level, time_comment, date_comment, comment_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [project, user, comment, comment_level, time_comment, date_comment, comment_type],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.get('/commentproject/:id', (req, res) => {
  const ID = req.params.id;
  db.query(
    "SELECT tbl_comment.comment_id, tbl_comment.comment, tbl_comment.time_comment, tbl_comment.date_comment, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname, tbl_user.director, tbl_user.manager, tbl_user.supervisor, tbl_user.supplies, tbl_user.responsible, tbl_user.admin FROM tbl_comment LEFT JOIN tbl_project ON tbl_comment.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_comment.user_id = tbl_user.user_id WHERE tbl_comment.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
});

app.get('/section', (req, res) => {
  db.query("SELECT * FROM tbl_section", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/projecttor', (req, res) => {
  db.query("SELECT * FROM tbl_project WHERE tor = 1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/quarterchargesone/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_one AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/indicreportone/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_one AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/detailreportone/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_one AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/problemreportone/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_one AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/quarterchargestwo/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_two AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/indicreporttwo/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_two AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/detailreporttwo/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_two AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/problemreporttwo/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_two AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/quarterchargesthree/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_three AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/indicreportthree/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_three AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/detailreportthree/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_three AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/problemreportthree/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_three AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/quarterchargesfour/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id WHERE tbl_report.quarter = tbl_project.report_four AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/indicreportfour/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_indic_project_result ON tbl_indic_project_result.indic_project_id = tbl_indic_project.indic_project_id WHERE tbl_indic_project_result.quarter = tbl_project.report_four AND tbl_indic_project.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/detailreportfour/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_detail.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_four AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/problemreportfour/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_problem ON tbl_problem.report_id = tbl_report.report_id WHERE tbl_report.quarter = tbl_project.report_four AND tbl_report.project_id = ?",
    [ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
});

app.get('/statuspurchase/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_statuspurchase WHERE project_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/addstatuspurchase', (req, res) => {
  const user = req.body.user_id
  const statuspurchase = req.body.statuspurchase;
  const time_statuspurchase = req.body.time_statuspurchase
  const date_statuspurchase = req.body.date_statuspurchase
  const project_id = req.body.project_id
  console.log('addstatuspurchase', req.body)
  db.query("INSERT INTO tbl_statuspurchase (user_id, statuspurchase, time_statuspurchase, date_statuspurchase, project_id) VALUES (?, ?, ?, ?, ?)",
    [user, statuspurchase, time_statuspurchase, date_statuspurchase, project_id],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.put('/updatestatuspurchase/:id', (req, res) => {
  console.log(req)
  const ID = req.params.id;
  const statuspurchase = req.body.statuspurchase;
  const time = req.body.time_statuspurchase;
  const date = req.body.date_statuspurchase;
  console.log('statuspurchase', req.body)
  db.query(
    "UPDATE tbl_statuspurchase SET statuspurchase = ?, time_statuspurchase = ?, date_statuspurchase = ?  WHERE statuspurchase_id = ?",
    [statuspurchase, time, date, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

app.get('/statuspurchaseproject', (req, res) => {
  db.query("SELECT * FROM tbl_statuspurchase", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/deleteprojectid', (req, res) => {
  db.query("SELECT * FROM tbl_project", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteproject/:ID", (req, res) => {
  const ID = req.params.ID;
  db.query("DELETE FROM tbl_project WHERE project_id = ?", ID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatestatusperson/:id', (req, res) => {
  const ID = req.params.id;
  const flag = req.body.flag;
  db.query(
    "UPDATE tbl_user SET flag = ? WHERE user_id = ?",
    [flag, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('flag', ID)
  console.log('newflag', flag)
})

//แก้ไขพวกประเด็นยุทธ์ในโปรเจค
app.get('/planname', (req, res) => {
  db.query("SELECT * FROM tbl_fiscalyear", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateplanname/:id', (req, res) => {
  const ID = req.params.id;
  const planname = req.body.fiscalyear_id;
  db.query(
    "UPDATE tbl_project SET fiscalyear_id = ? WHERE project_id = ?",
    [planname, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('planname', ID)
  console.log('newplanname', planname)
})

app.get('/Strategicpro', (req, res) => {
  db.query("SELECT * FROM tbl_strategic", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatestrategicpro/:id', (req, res) => {
  const ID = req.params.id;
  const strategicpro = req.body.strategic_id;
  db.query(
    "UPDATE tbl_project SET strategic_id = ? WHERE project_id = ?",
    [strategicpro, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('strategic', ID)
  console.log('newstrategic', strategicpro)
})

app.get('/goalpro', (req, res) => {
  db.query("SELECT * FROM tbl_goal", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updategoalpro/:id', (req, res) => {
  const ID = req.params.id;
  const goalpro = req.body.goal_id;
  db.query(
    "UPDATE tbl_project SET goal_id = ? WHERE project_id = ?",
    [goalpro, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('goal', ID)
  console.log('newgoal', goalpro)
})

app.get('/tacticpro', (req, res) => {
  db.query("SELECT * FROM tbl_tactic", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatetacticpro/:id', (req, res) => {
  const ID = req.params.id;
  const tacticpro = req.body.tactic_id;
  db.query(
    "UPDATE tbl_project SET tactic_id = ? WHERE project_id = ?",
    [tacticpro, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('tactic', ID)
  console.log('newtactic', tacticpro)
})



app.post('/addfile', (req, res) => {
  const project = req.body.project_id
  const fullpath = req.body.full_path
  const file = req.body.file_name
  const typefile = req.body.type_file
  const tor = req.body.tor
  console.log('file', req.body)
  db.query("INSERT INTO tbl_file (project_id, full_path, file_name, type_file, tor) VALUES (?, ?, ?, ?, ?)",
    [project, fullpath, file, typefile, tor],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
  console.log('filename', file)
})

///บูรณาการ
app.get("/integration", (req, res) => {
  db.query("SELECT * FROM  tbl_integration ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//แผนงาน
app.get("/workplan", (req, res) => {
  db.query("SELECT * FROM  tbl_workplan ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//สร้างโครงการ
app.post("/newproject", (req, res) => {
  const year = req.body.fiscalyear_id
  const section_id = req.body.section_id
  const strategic_id = req.body.strategic_id
  const goal_id = req.body.goal_id
  const tactic_id = req.body.tactic_id
  const integration_id = req.body.integration_id
  const workplan_id = req.body.workplan_id
  const project_name = req.body.project_name
  //const plan_name_main = req.body.plan_name_main
  const type = req.body.type
  const integra_name = req.body.integra_name
  const integra_subject = req.body.integra_subject
  const rationale = req.body.rationale
  const target_group = req.body.target_group
  const butget = req.body.butget  //ประมาณการงบประมาณที่ใช้
  const butget_char = req.body.butget_char //ประมาณการงบประมาณที่ใช้ ถ้วน
  const tor = req.body.tor
  //const source = req.body.source //ไอดีงบ
  const source_name = req.body.source_name //ชื่องบ
  const status = req.body.status // สถานะเจค 
  const out_plan = req.body.out_plan //โครงการนอกแผน
  ///รายงานความก้าวหน้าแต่ละไตรมาส 
  //จำนวนเงิน
  db.query("INSERT INTO tbl_project (fiscalyear_id,section_id,strategic_id,goal_id,tactic_id,integration_id,workplan_id,project_name,type,integra_name,integra_subject,rationale,target_group,butget,butget_char,tor,source_name,status,out_plan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
    [year, section_id, strategic_id, goal_id, tactic_id, integration_id, workplan_id, project_name, type, integra_name, integra_subject, rationale, target_group, butget, butget_char, tor, source_name, status, out_plan],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }
    })

  console.log("fiscalyear_id", year)
  console.log('section_id', section_id)
  console.log('srategic', strategic_id)
  console.log('goal_id', goal_id)
  console.log('tactic_id', tactic_id)
  console.log('integration_id', integration_id)
  console.log('workplan_id', workplan_id)
  console.log('project_name', project_name)
  console.log('rationale', rationale)
  console.log('integra_subject', integra_subject)



})
app.post("/newprojectindic", (req, res) => {
  const projectid = req.body.project_id
  const indic = req.body.indic_project
  const unit = req.body.unit
  const cost = req.body.cost
  //result_indic_project  ไว้เพิ่มตอนอัพเดต
  db.query("INSERT INTO tbl_indic_project (project_id,indic_project,unit,cost) VALUES (?,?,?,?) ",
    [projectid, indic, unit, cost],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    })
});

app.post("/newprojectstepe", (req, res) => {
  const projectid = req.body.project_id
  const stepname = req.body.step_name
  const start = req.body.start
  const stop = req.body.stop
  db.query("INSERT INTO tbl_step (project_id,step_name,start,stop) VALUES (?,?,?,?) ",
    [projectid, stepname, start, stop],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    })
})

app.post("/userproject", (req, res) => {
  const projectid = req.body.project_id
  const user_id = req.body.user_id
  db.query("INSERT INTO tbl_user_project (project_id,user_id) VALUES (?,?) ",
    [projectid, user_id],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    })
  console.log('user_id', user_id)

});

app.post("/newobjective", (req, res) => {
  const projectid = req.body.project_id
  const name = req.body.objective_name
  //obtain อัพเดต
  db.query("INSERT INTO tbl_objective(project_id,objective_name) VALUES (?,?) ",
    [projectid, name],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    })
  console.log('nameob', name)

})

app.post("/strategicproject", (req, res) => {
  const projectid = req.body.project_id
  const planid = req.body.plan_id
  const stid = req.body.strategic_id
  const goalid = req.body.goal_id
  const tacid = req.body.tactic_id

  db.query("INSERT INTO tbl_strategic_project(project_id,plan_id,strategic_id,goal_id,tactic_id) VALUES (?,?,?,?,?) ",
    [projectid, planid, stid, goalid, tacid],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }
    })

})

//addreportone
app.post('/createquartercharges', (req, res) => {
  const project = req.body.project_id
  const quarter = req.body.quarter
  const used = req.body.used;
  const periodcheck = req.body.period_check
  console.log('charges', req.body)
  db.query("INSERT INTO tbl_report (project_id, quarter, used, period_check) VALUES (?, ?, ?, ?)",
    [project, quarter, used, periodcheck],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send(result)
      }
    })
})

app.put('/updatereportone/:id', (req, res) => {
  const ID = req.params.id;
  const reportone = req.body.report_one;
  db.query(
    "UPDATE tbl_project SET report_one = ? WHERE project_id = ?",
    [reportone, ID],
    (err, result) => {
      if (err) {
        console.log('12', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('reportone', ID)
  console.log('newreportone', reportone)
})

app.get('/showreport/:id', (req, res) => {
  const ID = req.params.id;
  db.query("SELECT * FROM tbl_report LEFT JOIN tbl_project ON tbl_project.project_id = tbl_report.project_id  WHERE tbl_report.report_id = ?",
    [ID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  console.log('ID', ID)
});

app.post('/createdetail', (req, res) => {
  const report = req.body.report_id
  const detail = req.body.detail
  console.log('detail', req.body)
  db.query("INSERT INTO tbl_detail (report_id, detail) VALUES (?, ?)",
    [report, detail],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.post('/createproblem', (req, res) => {
  const report = req.body.report_id
  const problem = req.body.problem
  console.log('problem', req.body)
  db.query("INSERT INTO tbl_problem (report_id, problem) VALUES (?, ?)",
    [report, problem],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.get('/showresult/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_indic_project_result WHERE indic_project_result_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/createresult/:id', (req, res) => {
  const ID = req.params.id;
  const result = req.body.result;
  const achieve = req.body.achieve
  db.query(
    "UPDATE tbl_indic_project_result SET result = ?, achieve = ? WHERE indic_project_result_id = ?",
    [result, achieve, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('result', ID)
  console.log('newresult', result)
  console.log('achieve', ID)
  console.log('newachieve', achieve)
})

//addreporttwo
app.post('/createquarterchargestwo', (req, res) => {
  const project = req.body.project_id
  const quarter = req.body.quarter
  const used = req.body.used;
  const periodcheck = req.body.period_check
  console.log('charges', req.body)
  db.query("INSERT INTO tbl_report (project_id, quarter, used, period_check) VALUES (?, ?, ?, ?)",
    [project, quarter, used, periodcheck],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send(result)
      }
    })
})

app.put('/updatereporttwo/:id', (req, res) => {
  const ID = req.params.id;
  const reporttwo = req.body.report_two;
  db.query(
    "UPDATE tbl_project SET report_two = ? WHERE project_id = ?",
    [reporttwo, ID],
    (err, result) => {
      if (err) {
        console.log('12', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('reporttwo', ID)
  console.log('newreporttwo', reporttwo)
})

app.post('/createdetailtwo', (req, res) => {
  const report = req.body.report_id
  const detail = req.body.detail
  console.log('detail', req.body)
  db.query("INSERT INTO tbl_detail (report_id, detail) VALUES (?, ?)",
    [report, detail],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.post('/createproblemtwo', (req, res) => {
  const report = req.body.report_id
  const problem = req.body.problem
  console.log('problem', req.body)
  db.query("INSERT INTO tbl_problem (report_id, problem) VALUES (?, ?)",
    [report, problem],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    })
})

//addreportthree
app.post('/createquarterchargesthree', (req, res) => {
  const project = req.body.project_id
  const quarter = req.body.quarter
  const used = req.body.used;
  const periodcheck = req.body.period_check
  console.log('charges', req.body)
  db.query("INSERT INTO tbl_report (project_id, quarter, used, period_check) VALUES (?, ?, ?, ?)",
    [project, quarter, used, periodcheck],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send(result)
      }
    })
})

app.put('/updatereportthree/:id', (req, res) => {
  const ID = req.params.id;
  const reportthree = req.body.report_three;
  db.query(
    "UPDATE tbl_project SET report_three = ? WHERE project_id = ?",
    [reportthree, ID],
    (err, result) => {
      if (err) {
        console.log('12', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('reportthree', ID)
  console.log('newreportthree', reportthree)
})

app.post('/createdetailthree', (req, res) => {
  const report = req.body.report_id
  const detail = req.body.detail
  console.log('detail', req.body)
  db.query("INSERT INTO tbl_detail (report_id, detail) VALUES (?, ?)",
    [report, detail],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.post('/createproblemthree', (req, res) => {
  const report = req.body.report_id
  const problem = req.body.problem
  console.log('problem', req.body)
  db.query("INSERT INTO tbl_problem (report_id, problem) VALUES (?, ?)",
    [report, problem],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    })
})

//addreportfour
app.post('/createquarterchargesfour', (req, res) => {
  const project = req.body.project_id
  const quarter = req.body.quarter
  const used = req.body.used;
  const periodcheck = req.body.period_check
  console.log('charges', req.body)
  db.query("INSERT INTO tbl_report (project_id, quarter, used, period_check) VALUES (?, ?, ?, ?)",
    [project, quarter, used, periodcheck],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send(result)
      }
    })
})

app.put('/updatereportfour/:id', (req, res) => {
  const ID = req.params.id;
  const reportfour = req.body.report_four;
  db.query(
    "UPDATE tbl_project SET report_four = ? WHERE project_id = ?",
    [reportfour, ID],
    (err, result) => {
      if (err) {
        console.log('12', err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('reportfour', ID)
  console.log('newreportfour', reportfour)
})

app.post('/createdetailfour', (req, res) => {
  const report = req.body.report_id
  const detail = req.body.detail
  console.log('detail', req.body)
  db.query("INSERT INTO tbl_detail (report_id, detail) VALUES (?, ?)",
    [report, detail],
    (err, result) => {
      if (err) {
        console.log('13', err)
      } else {
        res.send("Values Inserted")
      }
    })
})

app.post('/createproblemfour', (req, res) => {
  const report = req.body.report_id
  const problem = req.body.problem
  console.log('problem', req.body)
  db.query("INSERT INTO tbl_problem (report_id, problem) VALUES (?, ?)",
    [report, problem],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    })
})

//editreport
app.get('/showeditreport/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_report WHERE report_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatequartercharges/:id', (req, res) => {
  const ID = req.params.id;
  const used = req.body.used;
  const periodcheck = req.body.period_check
  db.query(
    "UPDATE tbl_report SET used = ?, period_check = ? WHERE report_id = ?",
    [used, periodcheck, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('used', ID)
  console.log('newused', used)
  console.log('newperiodchck', periodcheck)
})

app.get('/showdetail/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_detail WHERE detail_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatedetail/:id', (req, res) => {
  const ID = req.params.id;
  const detail = req.body.detail;
  db.query(
    "UPDATE tbl_detail SET detail = ? WHERE detail_id = ?",
    [detail, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('detail', ID)
  console.log('newdetail', detail)
})

app.get('/showproblem/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_problem WHERE problem_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateproblem/:id', (req, res) => {
  const ID = req.params.id;
  const problem = req.body.problem;
  db.query(
    "UPDATE tbl_problem SET problem = ? WHERE problem_id = ?",
    [problem, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('problem', ID)
  console.log('newproblem', problem)
})

//editproject
app.get('/sectionpro', (req, res) => {
  db.query("SELECT * FROM tbl_section", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/userpro', (req, res) => {
  db.query("SELECT * FROM tbl_user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/showuserpro/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_user_project WHERE user_project_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateuserproject/:id', (req, res) => {
  const ID = req.params.id;
  const user = req.body.user_id
  db.query(
    "UPDATE tbl_user_project SET user_id = ? WHERE user_project_id = ?",
    [user, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('user', ID)
  console.log('newuser', user)
})

app.get('/integrationpro', (req, res) => {
  db.query("SELECT * FROM tbl_integration", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/showobjective/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_objective WHERE objective_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateobjective/:id', (req, res) => {
  const ID = req.params.id;
  const objective = req.body.objective_name;
  db.query(
    "UPDATE tbl_objective SET objective_name = ? WHERE objective_id = ?",
    [objective, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('objective', ID)
  console.log('newobjective', objective)
})

app.get('/showindicpro/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_indic_project WHERE indic_project_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updateindicpro/:id', (req, res) => {
  const ID = req.params.id;
  const indic = req.body.indic_project;
  const unit = req.body.unit;
  const cost = req.body.cost;
  db.query(
    "UPDATE tbl_indic_project SET indic_project = ?, unit = ?, cost = ? WHERE indic_project_id = ?",
    [indic, unit, cost, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('indic', ID)
  console.log('newindic', indic)
  console.log('newunit', unit)
  console.log('newcost', cost)
})

app.get('/showstep/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_step WHERE step_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatestep/:id', (req, res) => {
  const ID = req.params.id;
  const step = req.body.step_name;
  const start = req.body.start;
  const stop = req.body.stop;
  db.query(
    "UPDATE tbl_step SET step_name = ?, start = ?, stop = ? WHERE step_id = ?",
    [step, start, stop, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('step', ID)
  console.log('newstep', step)
  console.log('newstart', start)
  console.log('newstop', stop)
})

app.get('/workplanpro', (req, res) => {
  db.query("SELECT * FROM tbl_workplan", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/showchargeshead/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_charges WHERE charges_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatechargeshead/:id', (req, res) => {
  const ID = req.params.id;
  const chargeshead = req.body.charges_name_head;
  db.query(
    "UPDATE tbl_charges SET charges_name_head = ? WHERE charges_id = ?",
    [chargeshead, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('chargeshead', ID)
  console.log('newchargeshead', chargeshead)
})

app.put('/updatecharges/:id', (req, res) => {
  const ID = req.params.id;
  const charges = req.body.charges_name;
  const quarterone = req.body.quarter_one;
  const quartertwo = req.body.quarter_two;
  const quarterthree = req.body.quarter_three;
  const quarterfour = req.body.quarter_four;
  db.query(
    "UPDATE tbl_charges SET charges_name = ?, quarter_one = ?, quarter_two = ?, quarter_three = ?, quarter_four = ? WHERE charges_id = ?",
    [charges, quarterone, quartertwo, quarterthree, quarterfour, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('charges', ID)
  console.log('newcharges', charges)
  console.log('newquaterone', quarterone)
  console.log('newquatertwo', quartertwo)
  console.log('newquaterthree', quarterthree)
  console.log('newquaterfour', quarterfour)
})

app.get('/showbenefit/:id', (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_benefit WHERE benefit_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/updatebenefit/:id', (req, res) => {
  const ID = req.params.id;
  const benefit = req.body.benefit_name;
  db.query(
    "UPDATE tbl_benefit SET benefit_name = ? WHERE benefit_id = ?",
    [benefit, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('benefit', ID)
  console.log('newbenefit', benefit)
})

app.put('/updateproject/:id', (req, res) => {
  const ID = req.params.id;
  const fiscalyear = req.body.fiscalyear_id
  const section = req.body.section_id;
  const strategic = req.body.strategic_id;
  const goal = req.body.goal_id;
  const tactic = req.body.tactic_id;
  const integration = req.body.integration_id;
  const workplan = req.body.workplan_id;
  const kind = req.body.type;
  const integrasubject = req.body.integra_subject;
  const rationale = req.body.rationale;
  const targetgroup = req.body.target_group;
  const butget = req.body.butget;
  const butgetchar = req.body.butget_char;
  const tor = req.body.tor;
  const sourcename = req.body.source_name;
  const type = req.body.out_plan;
  const status = req.body.status;
  db.query(
    "UPDATE tbl_project SET fiscalyear_id = ?, section_id = ?, strategic_id = ?, goal_id = ?, tactic_id = ?, integration_id = ?, workplan_id = ?, type = ?, integra_subject = ?, rationale = ?, target_group = ?, butget = ?, butget_char = ?, tor = ?, source_name = ?, out_plan = ?, status = ? WHERE project_id = ?",
    [fiscalyear, section, strategic, goal, tactic, integration, workplan, kind, integrasubject, rationale, targetgroup, butget, butgetchar, tor, sourcename, type, status, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('id', ID)
  console.log('newfiscalyear', fiscalyear)
  console.log('newsection', section)
  console.log('newstrategic', strategic)
  console.log('newgoal', goal)
  console.log('newtactic', tactic)
  console.log('newintegration', integration)
  console.log('newworkplan', workplan)
  console.log('newkind', kind)
  console.log('newintegrasubject', integrasubject)
  console.log('newrationale', rationale)
  console.log('newtargetgroup', targetgroup)
  console.log('newbutget', butget)
  console.log('newbutgetchar', butgetchar)
  console.log('newtor', tor)
  console.log('newsourcename', sourcename)
  console.log('newtype', type)
  console.log('newstatus', status)
})

app.listen('3001', () => {
  console.log("Server is running on port 3001");
})