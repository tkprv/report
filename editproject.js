import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import { Form } from 'antd';
import { InputText } from 'primereact/inputtext';
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";

const Editproject = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [year, setYear] = useState();
  const [userproject, setUserproject] = useState([]);
  const [datauser, setDatauser] = useState();
  const [userid, setUserid] = useState();
  const [user, setUser] = useState();
  const [Selecteduser, setSelecteduser] = useState(null);
  const [strategic, setStrategic] = useState([]);
  const [fiscalyearandplanname, setFiscalyearandplanname] = useState([]);
  const [stopen, setStopen] = useState();
  const [stselectfill, setStselectfill] = useState([]);
  const [section, setSection] = useState();
  const [Selectedsection, setSelectedsection] = useState(null);
  const [selectstrategic, setSelectstrategic] = useState([]);
  const [selectgoal, setSelectgoal] = useState([]);
  const [selecttactic, setSelecttactic] = useState();
  const [datagoal, setDatagoal] = useState([]);
  const [datatactic, setDatatactic] = useState([]);
  const [edittype, setEdittype] = useState();
  const [editkind, setEditkind] = useState();
  const [integration, setIntegration] = useState();
  const [Selectedintegration, setSelectedintegration] = useState(null);
  const [editintegrasubject, setEditintegrasubject] = useState();
  const [objectiveproject, setObjectiveproject] = useState([]);
  const [editobjective, setEditobjective] = useState();
  const [dataobjective, setDataobjective] = useState();
  const [objectiveid, setObjectiveid] = useState();
  const [indicproject, setIndicproject] = useState([]);
  const [editindic, setEditindic] = useState();
  const [dataindic, setDataindic] = useState();
  const [indicid, setIndicid] = useState();
  const [editunit, setEditunit] = useState();
  const [editcost, setEditcost] = useState();
  const [stepproject, setStepproject] = useState([]);
  const [editstep, setEditstep] = useState();
  const [datastep, setDatastep] = useState();
  const [stepid, setStepid] = useState();
  const [editdatest, setEditdatest] = useState();
  const [editdatesp, setEditdatesp] = useState();
  const [selectedbutget, setSelectedbutget] = useState(null)
  const [editrationale, setEditrationale] = useState();
  const [edittargetgroup, setEdittargetgroup] = useState();
  const { ThaiBaht } = require('thai-baht-text-ts');
  const [editmoney, setEditmoney] = useState();
  const pie = parseFloat(editmoney, 10);
  const moneyText = ThaiBaht(pie);
  const [workplan, setWorkplan] = useState();
  const [Selectedworkplan, setSelectedworkplan] = useState(null);
  const [chargesproject, setChargesproject] = useState([]);
  const [chargesid, setChargesid] = useState();
  const [editchargeshead, setEditchargeshead] = useState();
  const [editcharges, setEditcharges] = useState();
  const [datacharges, setDatacharges] = useState();
  const [editcharges1, setEditcharges1] = useState();
  const [editcharges2, setEditcharges2] = useState();
  const [editcharges3, setEditcharges3] = useState();
  const [editcharges4, setEditcharges4] = useState();
  const [benefitproject, setBenefitproject] = useState([]);
  const [editbenefit, setEditbenefit] = useState();
  const [databenefit, setDatabenefit] = useState();
  const [benefitid, setBenefitid] = useState();
  const [edittor, setEdittor] = useState();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  let history = useHistory();

  console.log('44', location.state)

  useEffect(() => {
    getstrategicid()
    getfiscalyearandplanname()
    getuser()
    Strategicdata()
    selectsection()
    selectuser()
    selectintegration()
    getobjective()
    getindic()
    getstep()
    selectworkplan()
    getcharges()
    getbenefit()
  }, []);

  const onHide = () => {
    setVisible1(false)
    setVisible2(false)
    setVisible3(false)
    setVisible4(false)
    setVisible5(false)
    setVisible6(false)
    setVisible7(false)
  }

  const editdatauser = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขผู้รับผิดชอบโครงการ'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '16.5em' }}
          onClick={() => showuser(node)}
        ></Button>
      </div>
    );
  }

  const editdataobjective = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขวัตถุประสงค์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '13.5em' }}
          onClick={() => showobjective(node)}
        ></Button>
      </div>
    );
  }

  const editdataindic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขตัวชี้วัดความสำเร็จ หน่วยนับ ค่าเป้าหมาย'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '25em' }}
          onClick={() => showindic(node)}
        ></Button>
      </div>
    );
  }

  const editdatachargeshead = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขหัวข้อค่าใช้จ่าย'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '20em' }}
          onClick={() => showchargeshead(node)}
        ></Button>
      </div>
    );
  }

  const editdatacharges = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขประเภทค่าใช้จาย'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '20em' }}
          onClick={() => showcharges(node)}
        ></Button>
      </div>
    );
  }

  const editdatabenefit = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขประโยชน์ที่คาดว่าจะได้รับ'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '20em' }}
          onClick={() => showbenefit(node)}
        ></Button>
      </div>
    );
  }

  const editdatastep = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขขั้นตอนการดำเนินการ'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '16.5em' }}
          onClick={() => showstep(node)}
        ></Button>
      </div>
    );
  }

  const renderFooter1 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateuser(id, Selecteduser)} autoFocus />
      </div>
    );
  }

  const renderFooter2 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateobjective(id, editobjective)} autoFocus />
      </div>
    );
  }

  const renderFooter3 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateindic(id, editindic, editunit, editcost)} autoFocus />
      </div>
    );
  }

  const renderFooter4 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updatestep(id, editstep, editdatest, editdatesp)} autoFocus />
      </div>
    );
  }

  const renderFooter5 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updatechrageshead(id, editchargeshead)} autoFocus />
      </div>
    );
  }

  const renderFooter6 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updatebenefit(id, editbenefit)} autoFocus />
      </div>
    );
  }

  const renderFooter7 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updatechrages(id, editcharges, editcharges1, editcharges2, editcharges3, editcharges4)} autoFocus />
      </div>
    );
  }

  const getstrategicid = () => {
    axios
      .get("http://localhost:3001/strategicid", {})
      .then((res) => {
        setStrategic(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Strategicdata = () => {
    axios
      .get("http://localhost:3001/strategic", {})
      .then((res) => {
        Stopen(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Stopen = (m) => {
    const rows = [];
    const collunm = m.find((obj) => {
      if (obj.flag === 1) {
        rows.push(obj);
      }
    });
    setStopen(rows);
  };

  const onFiscalyear = (e) => {
    //setSelectedSt(e.value);
    setYear(e.value)
    const setst = strategic.filter(
      (strategic) => strategic.fiscalyear_id === e.value.fiscalyear_id
    );
    setStselectfill(setst);
  };

  const selectsection = () => {
    axios
      .get(`http://localhost:3001/sectionpro`, {})
      .then((res) => {
        console.log(res.data)
        setSection(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetSection = (e) => {
    setSelectedsection(e.target.value);
  }

  const getuser = () => {
    axios
      .get(`http://localhost:3001/userproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setUserproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('22', userproject)

  const showuser = (item) => {
    setUserid(item.user_project_id)
    axios
      .get(`http://localhost:3001/showuserpro/${item.user_project_id}`, {})
      .then((res) => {
        setDatauser(res.data[0].user_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible1(true)
  };

  const selectuser = () => {
    axios
      .get(`http://localhost:3001/userpro`, {})
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetUser = (e) => {
    setSelecteduser(e.target.value);
  }

  const updateuser = (id, Selecteduser) => {
    setVisible1(false)
    console.log('4444', id)
    axios.put(`http://localhost:3001/updateuserproject/${userid}`, {
      user_id: Selecteduser.user_id
    })
    alert(`ต้องการแก้ไขผู้รับผิดชอบโครงการใช่มั้ย?`)
    showuser()
  };

  const getfiscalyearandplanname = async () => {
    await axios
      .get(`http://localhost:3001/fiscalyearandplannameproject/${location.state.fiscalyear_id}`)
      .then((res) => {
        console.log(res.data.fiscalyear)
        setFiscalyearandplanname(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', fiscalyearandplanname?.plan_name)

  const onStrategic = (s) => {
    form.setFieldValue({ yeaselectissuer: s.value })
    setSelectstrategic(s.value);
    getdatagoal(s.value.strategic_id);
  }

  const onGoal = (e) => {
    setSelectgoal(e.value)
    gettactic(e.value.goal_id)
  }

  const getdatagoal = (id) => {
    axios
      .get(`http://localhost:3001/goaal${id}`, {})
      .then((res) => {
        setDatagoal(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const gettactic = (id) => {

    axios
      .get(`http://localhost:3001/tactic2${id}`, {})
      .then((res) => {
        setDatatactic(res.data)
        console.log('res.data', res.data)

      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handlType = (e) => {
    const choice = e.target.value
    setEdittype(choice)
    form.setFieldsValue({ edittype: choice })
  }

  const handlKind = (e) => {
    const choice = e.target.value
    setEditkind(choice)
    form.setFieldsValue({ editkind: choice })

  }

  const selectintegration = () => {
    axios
      .get(`http://localhost:3001/integrationpro`, {})
      .then((res) => {
        console.log(res.data)
        setIntegration(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetIntegration = (e) => {
    setSelectedintegration(e.target.value);
  }

  const getobjective = async () => {
    await axios
      .get(`http://localhost:3001/objectiveproject/${location.state.project_id}`)
      .then((res) => {
        console.log(res.data.data)
        setObjectiveproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('77', objectiveproject)

  const showobjective = (item) => {
    setObjectiveid(item.objective_id)
    axios
      .get(`http://localhost:3001/showobjective/${item.objective_id}`, {})
      .then((res) => {
        setDataobjective(res.data[0].objective_id)
        setEditobjective(res.data[0].objective_name)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible2(true)
  };

  const updateobjective = (id, editobjective) => {
    setVisible2(false)
    console.log('4444', id)
    axios.put(`http://localhost:3001/updateobjective/${objectiveid}`, {
      objective_name: editobjective
    })
    alert(`ต้องการแก้ไขวัตถุประสงค์ใช่มั้ย?`)
    showobjective()
  };

  const getindic = () => {
    axios
      .get(`http://localhost:3001/indicproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setIndicproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('88', indicproject)

  const showindic = (item) => {
    setIndicid(item.indic_project_id)
    axios
      .get(`http://localhost:3001/showindicpro/${item.indic_project_id}`, {})
      .then((res) => {
        setDataindic(res.data[0].indic_project_id)
        setEditindic(res.data[0].indic_project)
        setEditunit(res.data[0].unit)
        setEditcost(res.data[0].cost)
      })

      .catch((error) => {
        console.log(error)
      });
    setVisible3(true)
  };

  const updateindic = (id, editindic, editunit, editcost) => {
    setVisible3(false)
    console.log('4444', id)
    axios.put(`http://localhost:3001/updateindicpro/${indicid}`, {
      indic_project: editindic,
      unit: editunit,
      cost: editcost
    })
    alert(`ต้องการแก้ไขตัวชี้วัด หน่วยนับ และค่าเป้าหมายใช่มั้ย?`)
    showindic()
  };

  const getstep = () => {
    axios
      .get(`http://localhost:3001/stepproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setStepproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('99', stepproject)

  const showstep = (item) => {
    setStepid(item.step_id)
    axios
      .get(`http://localhost:3001/showstep/${item.step_id}`, {})
      .then((res) => {
        setDatastep(res.data[0].step_id)
        setEditstep(res.data[0].step_name)
        setEditdatest(res.data[0].start)
        setEditdatesp(res.data[0].stop)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible4(true)
  };

  const updatestep = (id, editstep, editdatest, editdatesp) => {
    setVisible4(false)
    const datest = moment(editdatest).format('YYYY-MM-DD')
    const datesp = moment(editdatesp).format('YYYY-MM-DD')
    axios.put(`http://localhost:3001/updatestep/${stepid}`, {
      step_name: editstep,
      start: datest,
      stop: datesp
    })
    alert(`ต้องการแก้ไขขั้นตอนดำเนินการใช่มั้ย?`)
    showstep()
  };

  const butget = [
    { name: 'งบประมาณรายได้มหาลัย' },
    { name: 'งบประมาณรายได้ของส่วนงาน' },
    { name: 'งบประมาณรายได้ของแผ่นดิน' },
    { name: 'งบอื่นๆ' },
    { name: 'ไม่ได้ใช้งบประมาณ' }
  ]

  const handleMoney = (e) => {
    setEditmoney(e.target.value)
    form.setFieldsValue({ amount: e.target.value.replace(/[^0-9]*$/, '') })
  }

  const selectworkplan = () => {
    axios
      .get(`http://localhost:3001/workplanpro`, {})
      .then((res) => {
        console.log(res.data)
        setWorkplan(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetWorkolan = (e) => {
    setSelectedworkplan(e.target.value);
  }

  const getcharges = () => {
    axios
      .get(`http://localhost:3001/chargesproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setChargesproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('101', chargesproject)

  const showchargeshead = (item) => {
    setChargesid(item.charges_id)
    axios
      .get(`http://localhost:3001/showchargeshead/${item.charges_id}`, {})
      .then((res) => {
        setDatacharges(res.data[0].charges_id)
        setEditchargeshead(res.data[0].charges_name_head)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible5(true)
  };

  const updatechrageshead = (id, editchargeshead) => {
    setVisible5(false)
    console.log('4444', id)
    axios.put(`http://localhost:3001/updatechargeshead/${chargesid}`, {
      charges_name_head: editchargeshead
    })
    alert(`ต้องการแก้ไขหัวข้อค่าใช้จ่ายใช่มั้ย?`)
    showchargeshead()
  };

  const showcharges = (item) => {
    setChargesid(item.charges_id)
    axios
      .get(`http://localhost:3001/showchargeshead/${item.charges_id}`, {})
      .then((res) => {
        setDatacharges(res.data[0].charges_id)
        setEditcharges(res.data[0].charges_name)
        setEditcharges1(res.data[0].quarter_one)
        setEditcharges2(res.data[0].quarter_two)
        setEditcharges3(res.data[0].quarter_three)
        setEditcharges4(res.data[0].quarter_four)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible7(true)
  };

  const updatechrages = (id, editcharges, editcharges1, editcharges2, editcharges3, editcharges4) => {
    setVisible7(false)
    console.log('4444', id)
    axios.put(`http://localhost:3001/updatecharges/${chargesid}`, {
      charges_name: editcharges,
      quarter_one: editcharges1,
      quarter_two: editcharges2,
      quarter_three: editcharges3,
      quarter_four: editcharges4
    })
    alert(`ต้องการแก้ไขหัวประเภทค่าใช้จ่ายใช่มั้ย?`)
    showcharges()
  };

  const getbenefit = () => {
    axios
      .get(`http://localhost:3001/benefitproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setBenefitproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('102', benefitproject?.benefit_name)

  const showbenefit = (item) => {
    setBenefitid(item.benefit_id)
    axios
      .get(`http://localhost:3001/showbenefit/${item.benefit_id}`, {})
      .then((res) => {
        setDatabenefit(res.data[0].benefit_id)
        setEditbenefit(res.data[0].benefit_name)
      })

      .catch((error) => {
        console.log(error)
      });
    setVisible6(true)
  };

  const updatebenefit = (id, editbenefit) => {
    setVisible6(false)
    console.log('4444', id)
    axios.put(`http://localhost:3001/updatebenefit/${benefitid}`, {
      benefit_name: editbenefit
    })
    alert(`ต้องการแก้ไขประโยชน์ที่คาดว่าจะได้รับใช่มั้ย?`)
    showbenefit()
  };

  const handlTor = (e) => {
    const choice = e.target.value
    setEdittor(choice)
    form.setFieldsValue({ edittor: choice })

  }

  const updateproject = (id, year, Selectedsection, selectstrategic, selectgoal, selecttactic, Selectedintegration, Selectedworkplan, editkind, editintegrasubject, editrationale, edittargetgroup, editmoney, moneyText, edittor, selectedbudget, edittype) => {
    axios
      .put(`http://localhost:3001/updateproject/${id}`, {
        fiscalyear_id: year.fiscalyear_id,
        section_id: Selectedsection.section_id,
        strategic_id: selectstrategic.strategic_id,
        goal_id: selectgoal.goal_id,
        tactic_id: selecttactic.tactic_id,
        integration_id: Selectedintegration.integration_id,
        workplan_id: Selectedworkplan.workplan_id,
        type: (editkind === 'โครงการใหม่') ? 1 : (editkind === 'โครงการต่อเนื่อง') ? 2 : (editkind === 'งานประจำ') ? 3 : 4,
        integra_subject: editintegrasubject,
        rationale: editrationale,
        target_group: edittargetgroup,
        butget: editmoney,
        butget_char: moneyText,
        tor: (edittor === 'มี') ? 1 : 0,
        source_name: (selectedbudget === 'ไม่ได้ใช้งบประมาณ') ? null : selectedbudget.name,
        out_plan: (edittype === 'โครงการนอกแผน') ? 1 : 0,
        status: 0
      })
    alert(`ต้องการแก้ไขโครงการใช่มั้ย?`)
  }

  return (
    <div align="left">
      <h2 style={{ marginTop: '2em', marginLeft: '1em' }}>รายละเอียดโครงการ</h2>
      <Card>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ปีงบประมาณ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={year} options={stopen} onChange={onFiscalyear} style={{ width: '10em' }} optionLabel="fiscalyear" placeholder="ปีงบประมาณ" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ชื่อโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4> {location.state.project_name} </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>หน่วยงานที่รับผิดชอบโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={Selectedsection} options={section} style={{ width: '30em' }} onChange={onsetSection} optionLabel="section_name" placeholder="หน่วยงานที่รับผิดชอบโครงการ" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ผู้รับผิดชอบโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <DataTable value={userproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                <Column field="fname" header="ชื่อผู้รับผิดชอบโครงการ" />
                <Column field="lname" header="นามสกุลผู้รับผิดชอบโครงการ" />
                <Column body={editdatauser} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
              </DataTable>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ชื่อแผนยุทธ์ศาสตร์ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                {fiscalyearandplanname?.plan_name}
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3 style={{ marginLeft: "9.5em" }}>ประเด็นยุทธ์ศาสตร์ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={selectstrategic} options={stselectfill} style={{ width: '30em' }} onChange={onStrategic} optionLabel="strategic_name" placeholder="ประเด็นยุทธศาสตร์" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3 style={{ marginLeft: "9.5em" }}>เป้าประสงค์ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={selectgoal} options={datagoal} style={{ width: '30em' }} onChange={onGoal} optionLabel="goal_name" placeholder="เป้าประสงค์" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3 style={{ marginLeft: "9.5em" }}>กลยุทธ์ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={selecttactic} options={datatactic} style={{ width: '30em' }} onChange={(e) => setSelecttactic(e.value)} optionLabel="tactic_name" placeholder="กลยุทธ์" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ประเภทของโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <RadioButton
                  inputId="edittype1"
                  name="edittype"
                  value="โครงการในแผน"
                  onChange={handlType}
                  checked={edittype === "โครงการในแผน"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="edittype1" style={{ marginRight: '2em' }}>โครงการในแผน</label>
                <RadioButton
                  inputId="edittype2"
                  name="edittype"
                  value="โครงการนอกแผน"
                  onChange={handlType}
                  checked={edittype === "โครงการนอกแผน"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="edittype2">โครงการนอกแผน</label>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ลักษณะโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <RadioButton
                  inputId="editkind1"
                  name="editkind"
                  value="โครงการใหม่"
                  onChange={handlKind}
                  checked={editkind === "โครงการใหม่"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="editkind1" style={{ marginRight: '2em' }}>โครงการใหม่</label>
                <RadioButton
                  inputId="editkind2"
                  name="editkind"
                  value="โครงการต่อเนื่อง"
                  onChange={handlKind}
                  checked={editkind === "โครงการต่อเนื่อง"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="editkind2" style={{ marginRight: '2em' }}>โครงการต่อเนื่อง</label>
                <RadioButton
                  inputId="editkind3"
                  name="editkind"
                  value="งานประจำ"
                  onChange={handlKind}
                  checked={editkind === "งานประจำ"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="editkind3" style={{ marginRight: '2em' }}>งานประจำ</label>
                <RadioButton
                  inputId="editkind4"
                  name="editkind"
                  value="งานพัฒนา"
                  onChange={handlKind}
                  checked={editkind === "งานพัฒนา"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="editkind4">งานพัฒนา</label>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>การบูรณาการโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <Dropdown value={Selectedintegration} options={integration} onChange={onsetIntegration} style={{ width: '30em' }} optionLabel="integration_name" placeholder="หัวข้อการบูรณาการโครงการ" />
              </h4>
              <InputTextarea value={editintegrasubject} onChange={(e) => setEditintegrasubject(e.target.value)} placeholder='การบูรณาการโครงการ' rows={5} cols={30} />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>หลักการและเหตุผล :</h3>
            </div>
            <div className="col-12 md:col-9">
              <InputTextarea value={editrationale} onChange={(e) => setEditrationale(e.target.value)} placeholder='หลักการและเหตุผล' rows={8} cols={50} />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>วัตถุประสงค์ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={objectiveproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="objective_name" header="วัตถุประสงค์" />
                  <Column body={editdataobjective} header="จัดการ" style={{ textAlign: 'center' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ตัวชี้วัดความสำเร็จระดับโครงการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="indic_project" header="ตัวชี้วัดความสำเร็จ" />
                  <Column field="unit" header="หน่วยนับ" style={{ textAlign: 'center', width: '6em' }} />
                  <Column field="cost" header="ค่าเป้าหมาย" style={{ textAlign: 'center', width: '7.5em' }} />
                  <Column body={editdataindic} header="จัดการ" style={{ textAlign: 'center', width: '15em' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>กลุ่มเป้าหมาย :</h3>
            </div>
            <div className="col-12 md:col-9">
              <InputText value={edittargetgroup} onChange={(e) => setEdittargetgroup(e.target.value)} style={{ width: '35em' }} placeholder="กลุ่มเป้าหมาย" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ขั้นตอนการดำเนินการ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={stepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม" />
                  <Column field="start" header="เริ่มต้น" />
                  <Column field="stop" header="สิ้นสุด" />
                  <Column body={editdatastep} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>แหล่งเงิน/ประเภทงบประมาณที่ใช้ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={selectedbutget} onChange={(e) => setSelectedbutget(e.target.value)} options={butget} optionLabel="name" placeholder="แหล่งเงิน/ประเภทงบประมาณที่ใช้" style={{ width: '30em' }} />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ปริมาณการงบประมาณที่ใช้ :</h3>
            </div>
            <div className="col-12 md:col-3">
              <InputText value={editmoney} onChange={handleMoney} style={{ width: '20em' }} placeholder="ปริมาณการงบประมาณที่ใช้ " />
            </div>
            <div className="col-12 md:col-3">
              <div className="p-inputgroup">
                {editmoney && <h4>{moneyText}</h4>}
              </div>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>แผนงาน :</h3>
            </div>
            <div className="col-12 md:col-9">
              <Dropdown value={Selectedworkplan} options={workplan} style={{ width: '30em' }} onChange={onsetWorkolan} optionLabel="workplan_name" placeholder="แผนงาน" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ประเภทการใช้จ่าย :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="charges_name_head" header="หัวข้อค่าใช้จ่าย" />
                  <Column body={editdatachargeshead} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                </DataTable>
              </h4>
              <h4>
                <DataTable value={chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="charges_name" header="ประเภทค่าใช้จ่าย" />
                  <Column field="quarter_one" header="แผ่นการใช้จ่ายไตรมาส 1" />
                  <Column field="quarter_two" header="แผ่นการใช้จ่ายไตรมาส 2" />
                  <Column field="quarter_three" header="แผ่นการใช้จ่ายไตรมาส 3" />
                  <Column field="quarter_four" header="แผ่นการใช้จ่ายไตรมาส 4" />
                  <Column body={editdatacharges} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ประโยชน์ที่คาดว่าจะได้รับ :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={benefitproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="benefit_name" header="ประโยชน์ที่ควาดว่าจะได้รับ" />
                  <Column body={editdatabenefit} header="จัดการ" style={{ textAlign: 'center', width: '15em' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>เอกสาร TOR :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <RadioButton
                  inputId="edittor1"
                  name="edittor"
                  value="มี"
                  onChange={handlTor}
                  checked={edittor === "มี"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="edittor1" style={{ marginRight: '2em' }}>มี</label>
                <RadioButton
                  inputId="edittor"
                  name="edittor"
                  value="ไม่มี"
                  onChange={handlTor}
                  checked={edittor === "ไม่มี"}
                  style={{ marginRight: '.5em' }}
                />
                <label htmlFor="edittor2">ไม่มี</label>
              </h4>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2em', marginLeft: '82.5em' }} >
          <Button label="บันทึก" className="p-button-success" onClick={() => updateproject(location.state.project_id, year, Selectedsection, selectstrategic, selectgoal, selecttactic, Selectedintegration, Selectedworkplan, editkind, editintegrasubject, editrationale, edittargetgroup, editmoney, moneyText, edittor, selectedbutget, edittype)} />
        </div>
      </Card>

      <Dialog
        style={{ width: '500px', width: "50vw" }} header="เแก้ไขผู้รับผิดชอบโครงการ" modal className="p-fluid"
        visible={visible1}
        footer={renderFooter1}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-5">
              <h3>ชื่อผู้รับผิดชอบโครงการ :</h3>
            </div>
            <div className="col-12 md:col-1">
              <Dropdown value={Selecteduser} options={user} onChange={onsetUser} style={{ width: '23em' }} optionLabel="fname" placeholder="ชื่อผู้รับผิดชอบโครงการ" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-5">
              <h3>นามสกุลผู้รับผิดชอบโครงการ :</h3>
            </div>
            <div className="col-12 md:col-1">
              <Dropdown value={Selecteduser} options={user} onChange={onsetUser} style={{ width: '23em' }} optionLabel="lname" placeholder="นามสกุลผู้รับผิดชอบโครงการ" />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขวัตถุประสงค์" modal className="p-fluid"
        visible={visible2}
        footer={renderFooter2}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>วัตถุประสงค์ :</h3>
            </div>
            <div className="col-12 md:col-1">
              <InputText
                value={editobjective}
                onChange={(e) => setEditobjective(e.target.value)}
                style={{ width: '30.5em' }}
                placeholder="วัตถุประสงค์"
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขตัวชี้วัด หน่วยนับ และค่าเป้าหมาย" modal className="p-fluid"
        visible={visible3}
        footer={renderFooter3}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>ตัวชี้วัดความสำเร็จ :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editindic}
                onChange={(e) => setEditindic(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="ตัวชี้วัดความสำเร็จ"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>หน่วยนับ :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editunit}
                onChange={(e) => setEditunit(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="หน่วยนับ"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>ค่าเป้าหมาย :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editcost}
                onChange={(e) => setEditcost(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="ค่าเป้าหมาย"
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขขั้นตอนดำเนินการ" modal className="p-fluid"
        visible={visible4}
        footer={renderFooter4}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>ขั้นตอนการดำเนินการ :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editstep}
                onChange={(e) => setEditstep(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="ขั้นตอนการดำเนินการ"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>เริ่มต้น :</h3>
            </div>
            <div className="col-12 md:col-8">
              <Calendar
                id="basic"
                placeholder="เลือกวันที่เริ่มต้น"
                value={editdatest}
                onChange={(e) => setEditdatest(e.target.value)}
                style={{ width: '26.5em' }}
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>สิ้นสุด :</h3>
            </div>
            <div className="col-12 md:col-8">
              <Calendar
                id="basic"
                placeholder="เลือกวันที่สิ้นสุด"
                value={editdatesp}
                onChange={(e) => setEditdatesp(e.target.value)}
                style={{ width: '26.5em' }}
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขหัวข้อค่าใช้จ่าย" modal className="p-fluid"
        visible={visible5}
        footer={renderFooter5}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>หัวข้อค่าใช้จ่าย :</h3>
            </div>
            <div className="col-12 md:col-1">
              <InputText
                value={editchargeshead}
                onChange={(e) => setEditchargeshead(e.target.value)}
                style={{ width: '30.5em' }}
                placeholder="หัวข้อค่าใช้จ่าย"
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขประโยช์ที่คาดว่าจะได้รับ" modal className="p-fluid"
        visible={visible6}
        footer={renderFooter6}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>ประโยช์ที่คาดว่าจะได้รับ :</h3>
            </div>
            <div className="col-12 md:col-1">
              <InputText
                value={editbenefit}
                onChange={(e) => setEditbenefit(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="ประโยช์ที่คาดว่าจะได้รับ"
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขประเภทค่าใช้จ่าย และแผนการใช้จ่ายในแต่ละไตรมาส" modal className="p-fluid"
        visible={visible7}
        footer={renderFooter7}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>ประเภทค่าใช้จ่าย :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editcharges}
                onChange={(e) => setEditcharges(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="ประเภทค่าใช้จ่าย"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>แผนการใช้จ่ายไตรมาส 1 :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editcharges1}
                onChange={(e) => setEditcharges1(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="แผนการใช้จ่ายไตรมาส 1"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>แผนการใช้จ่ายไตรมาส 2 :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editcharges2}
                onChange={(e) => setEditcharges2(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="แผนการใช้จ่ายไตรมาส 2"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>แผนการใช้จ่ายไตรมาส 3 :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editcharges3}
                onChange={(e) => setEditcharges3(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="แผนการใช้จ่ายไตรมาส 3"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>แผนการใช้จ่ายไตรมาส 4 :</h3>
            </div>
            <div className="col-10 md:col-1">
              <InputText
                value={editcharges4}
                onChange={(e) => setEditcharges4(e.target.value)}
                style={{ width: '26.5em' }}
                placeholder="แผนการใช้จ่ายไตรมาส 4"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Editproject