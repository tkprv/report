const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

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

app.post('/auth', function(request, response) {
	// Capture the input fields
  console.log(request.body)
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM tbl_user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
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
        console.log('5',err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('name',section_name)
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log('4',err);
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
    [section_name,section_id], 
    (err, result) => {
      if (err) {
        console.log('3',err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('ghhjj',section_id)
  console.log('ghjj',section_name)
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
    [secid,user,pas,fname,lname,telno,email,director,manager,supervisor,supplies,responsible,admin,flag],
    (err, result) => {
      if (err) {
        console.log('5',err);
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
    [secid,director,manager,supervisor,supplies,responsible,admin,id], 
    (err, result) => {
      if (err) {
        console.log('3',err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('id',id)
  console.log('secid',secid)
  console.log('director',director)
  console.log('manager',manager)
  console.log('supervisor',supervisor)
  
})

app.delete("/delete/:p_id", (req, res) => {
  const p_id = req.params.p_id;
  db.query("DELETE FROM tbl_user WHERE user_id = ?", p_id, (err, result) => {
    if (err) {
      console.log('2',err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete2/:a_id", (req, res) => {
  const a_id = req.params.a_id;
  db.query("DELETE FROM tbl_section WHERE section_id = ?", a_id, (err, result) => {
    if (err) {
      console.log('1',err);
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
    [year,plan],
    (err, result) => {
      if (err) {
        console.log('5',err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('ghhjj',year)
  console.log('ghjj',plan)
  
});

app.delete("/deletestrategic/:f_id", (req, res) => {
  const delete_id = req.params.f_id;
  db.query("DELETE FROM tbl_fiscalyear WHERE fiscalyear_id = ?", delete_id, (err, result) => {
    if (err) {
      console.log('1',err);
    } else {
      res.send(result);
    }
  });
  console.log('ghjj',delete_id)
});

app.put("/updatestrategic/:f_id", (req, res) => {
  const ID = req.params.f_id
  const name = req.body.plan_name
  const  time1 = req.body.director_of_time
  const date1 = req.body.director_of_date
  const time2 = req.body.ref_of_time
  const date2 = req.body.ref_of_date
  db.query(
    "UPDATE tbl_fiscalyear SET plan_name = ? , director_of_time= ? , director_of_date= ? , ref_of_time= ? , ref_of_date= ?  WHERE fiscalyear_id = ?",
    [name,time1,date1,time2,date2,ID], 
    (err, result) => {
      if (err) {
        console.log('3',err)
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
    [flag,ID], 
    (err, result) => {
      if (err) {
        console.log('3',err)
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
      console.log('1',err);
    } else {
      res.send(result);
    }
  });
  console.log('ghjj',delete_id)
});

app.post("/createstid", (req, res) => {
  const year = req.body.fiscalyear_id
  const order = req.body.order_strategic
  const name = req.body.strategic_name
  db.query(
    "INSERT INTO tbl_strategic (fiscalyear_id,order_strategic,strategic_name) VALUES (?,?,?)",
    [year,order,name],
    (err, result) => {
      if (err) {
        console.log('5',err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('ghhjj',year)
  console.log('ghjj',order)
  console.log('ghjj',name)
  
});
app.put("/updatest/:ID", (req, res) => {
  const ID = req.params.ID;
  const name = req.body.strategic_name;
  db.query(
    "UPDATE tbl_strategic SET strategic_name = ?  WHERE strategic_id = ?",
    [name,ID], 
    (err, result) => {
      if (err) {
        console.log('3',err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('2',ID)
  console.log('2',name)
})
////////ข้อมูลประเด็นยุธ .strategic_id JOIN tbl_indic_goal ON tbl_goal.goal_id = tbl_indic_goal.goal_id JOIN tbl_tactic ON tbl_indic_goal.goal_id = tbl_tactic.goal_id 
app.get("/datast/:id", (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM tbl_strategic JOIN tbl_goal ON tbl_strategic.strategic_id = tbl_goal.strategic_id JOIN tbl_indic_goal ON tbl_goal.goal_id = tbl_indic_goal.goal_id JOIN tbl_tactic ON tbl_goal.goal_id  = tbl_tactic.goal_id WHERE tbl_strategic.strategic_id  = ? ",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

  console.log('jj',id)
});


/////เป้าปรสงค์กลยุทธ
app.get("/goaal:id", (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM  tbl_goal WHERE tbl_goal.strategic_id  = ? ",id,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/goal", (req, res) => {
  // const id = req.params.id
  db.query("SELECT * FROM  tbl_goal",(err, result) => {
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
    [strategic_id,order,name ],
    (err, result) => {
      if (err) {
        console.log('5',err);
      } else {
        res.send(result);
      }
    }
  );
  console.log('strategic_id',strategic_id)
  console.log('order',order)
  console.log('name',name)
  
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
    [goalid,order,indicgoal,unit,cost ],
    (err, result) => {
      if (err) {
        console.log('5',err);
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
  console.log('jj',id)
});

app.post("/createtactic", (req, res) => {
  const goalid = req.body.goal_id
  const ordertactic = req.body.order_tactic
  const name = req.body.tactic_name
  
  db.query(
    "INSERT INTO tbl_tactic(goal_id,order_tactic,tactic_name) VALUES (?,?,?)",
    [goalid,ordertactic,name ],
    (err, result) => {
      if (err) {
        console.log('5',err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log('goalid',goalid)
  console.log('ordertactic',ordertactic)
  console.log('name',name)
});

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
  db.query("SELECT tbl_charges.charges_id, tbl_charges.charges_name_head, tbl_charges.quarter_one, tbl_charges.quarter_two, tbl_charges.quarter_three, tbl_charges.quarter_four, tbl_project.project_id FROM tbl_charges LEFT JOIN tbl_project ON tbl_charges.project_id = tbl_project.project_id WHERE tbl_charges.project_id = ?",
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
  console.log('id',ID)
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



app.get('/showgoal/:id', (req, res) => {
  const ID = req.params.id
  console.log('id',ID)
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
  console.log('id',ID)
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
  const indicgoal= req.body.indic_goal;
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

app.listen('3001', () => {
    console.log("Server is running on port 3001");
})