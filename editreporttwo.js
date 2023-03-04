import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";

const Editreporttwo = () => {
  const location = useLocation()
  const [quartercharges, setQuartercharges] = useState([]);
  const [indic, setIndic] = useState([]);
  const [step, setStep] = useState([]);
  const [detail, setDetail] = useState([]);
  const [problem, setProblem] = useState([]);
  const [setDisplayBasic] = useState(false)
  const [editquartercharges, setEditquartercharges] = useState([]);
  const [result, setResult] = useState();
  const [editresult, setEditresult] = useState();
  const [resultid, setResultid] = useState();
  const [editdetail, setEditdetail] = useState();
  const [datadetail, setDatadetail] = useState();
  const [detailid, setDetailid] = useState();
  const [editproblem, setEditproblem] = useState();
  const [dataproblem, setDataproblem] = useState();
  const [problemid, setProblemid] = useState();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  let history = useHistory();
  console.log('project', location.state)

  useEffect(() => {
    getstep()
    getquartercharges()
    getindic()
    getdetail()
    getproblem()
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const onHide = () => {
    setVisible1(false)
    setVisible2(false)
    setVisible3(false)
  }

  const achieve = (node) => {
    if (node.achieve === 0) {
      return <Tag severity="danger" icon="pi pi-times" rounded></Tag>
    } else {
      return <Tag severity="success" icon="pi pi-check" rounded></Tag>
    }
  }

  const editdataresult = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขผลตามตัวชี้วัดและบรรลุตามตัวชี้วัด'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '23em' }}
          onClick={() => showresult(node)}
        ></Button>
      </div>
    );
  }

  const editdatadetail = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขรายละเอียดความก้าวหน้า'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '19em' }}
          onClick={() => showdetail(node)}
        ></Button>
      </div>
    );
  }

  const editdataproblem = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขรายปัญหา/อุปสรรค'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '16em' }}
          onClick={() => showproblem(node)}
        ></Button>
      </div>
    );
  }

  const renderFooter1 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateresult(id, editresult, checked1)} autoFocus />
      </div>
    );
  }

  const renderFooter2 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updatedetail(id, editdetail)} autoFocus />
      </div>
    );
  }

  const renderFooter3 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateproblem(id, editproblem)} autoFocus />
      </div>
    );
  }

  const getquartercharges = () => {
    axios
      .get(`http://localhost:3001/quarterchargestwo/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setQuartercharges(res.data)
        setEditquartercharges(res.data[0].used)
        setChecked(res.data[0].period_check === 0 ? false : true)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', quartercharges)

  const getindic = () => {
    axios
      .get(`http://localhost:3001/indicreporttwo/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setIndic(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('22', indic)

  const getstep = () => {
    axios
      .get(`http://localhost:3001/stepproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setStep(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('33', step)

  const getdetail = () => {
    axios
      .get(`http://localhost:3001/detailreporttwo/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setDetail(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('44', detail)

  const getproblem = () => {
    axios
      .get(`http://localhost:3001/problemreporttwo/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setProblem(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('55', problem)

  const updatequartercharges = (id, editquartercharges, checked) => {
    console.log('id', id)
    axios
      .put(`http://localhost:3001/updatequartercharges/${id}`, {
        used: editquartercharges,
        period_check: (checked === true) ? 1 : 0
      }).then((res) => {

      })
      alert(`ต้องการแก้ไขผลการใช้จ่ายใช่มั้ย?`)
  }

  const showresult = (item) => {
    setResultid(item.indic_project_result_id)
    axios
      .get(`http://localhost:3001/showresult/${item.indic_project_result_id}`, {})
      .then((res) => {
        setResult(res.data[0].indic_project_result_id)
        setEditresult(res.data[0].result)
        setChecked1(res.data[0].achieve === 0 ? false : true)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible1(true)
  };

  const updateresult = (id, editresult, checked1) => {
    setVisible1(false)
    axios.put(`http://localhost:3001/createresult/${resultid}`, {
      result: editresult,
      achieve: (checked1 === true) ? 1 : 0
    })
    alert(`ต้องการแก้ไขผลตามตัวชี้วัด และบรรลุตามตัวชี้วัดใช่มั้ย?`)
    showresult()
  };

  const showdetail = (item) => {
    setDetailid(item.detail_id)
    axios
      .get(`http://localhost:3001/showdetail/${item.detail_id}`, {})
      .then((res) => {
        setDatadetail(res.data[0].detail_id)
        setEditdetail(res.data[0].detail)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible2(true)
  };

  const updatedetail = (id, editdetail) => {
    setVisible2(false)
    axios.put(`http://localhost:3001/updatedetail/${detailid}`, {
      detail: editdetail,
    })
    alert(`ต้องการแก้ไขรายละเอียดความก้าวหน้าใช่มั้ย?`)
    showdetail()
  };

  const showproblem = (item) => {
    setProblemid(item.problem_id)
    axios
      .get(`http://localhost:3001/showproblem/${item.problem_id}`, {})
      .then((res) => {
        setDataproblem(res.data[0].problem_id)
        setEditproblem(res.data[0].problem)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible3(true)
  };

  const updateproblem = (id, editproblem) => {
    setVisible3(false)
    axios.put(`http://localhost:3001/updateproblem/${problemid}`, {
      problem: editproblem,
    })
    alert(`ต้องการแก้ไขปัญหา/อุปสรรคใช่มั้ย?`)
    showproblem()
  };

  return (
    <div align="left">
      <h2 style={{ marginTop: '2em', marginLeft: '1em' }}>รายงานความก้าวหน้าไตรมาส 2</h2>
      <Card>
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
              <h3>งบประมาณที่จัดสรร :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4> {location.state.butget} บาท</h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ผลการใช้จ่าย :</h3>
            </div>
            <div className="col-12 md:col-9">
              <InputText value={editquartercharges} onChange={(e) => setEditquartercharges(e.target.value)} style={{ width: '35em' }} placeholder="งบไตรมาสที่ 2" />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ผลตามตัวชี้วัด :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={indic} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="indic_project" header="ตัวชี้วัด" />
                  <Column field="cost" header="เป้าหมาย" style={{ textAlign: 'center', width: '6.5em' }} />
                  <Column field="result" header="ผลตามตัวชี้วัด" style={{ textAlign: 'center', width: '8.5em' }} />
                  <Column body={achieve} header="บรรลุตามตัวชี้วัด" style={{ textAlign: 'center', width: '9.5em' }} />
                  <Column body={editdataresult} header="จัดการ" style={{ textAlign: 'center', width: '25em' }} />
                </DataTable>
              </h4>
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
                <DataTable value={step} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม" />
                  <Column field="start" header="เริ่มต้น" />
                  <Column field="stop" header="สิ้นสุด" />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>มีการดำเนินงานตามระยะเวลาที่กำหนด :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>รายละเอียดความก้าวหน้า :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={detail} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="detail" header="รายละเอียดความก้าวหน้า" />
                  <Column body={editdatadetail} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ปัญหา/อุปสรรค :</h3>
            </div>
            <div className="col-12 md:col-9">
              <h4>
                <DataTable value={problem} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                  <Column field="problem" header="ปัญหา/อุปสรรค" />
                  <Column body={editdataproblem} header="จัดการ" style={{ textAlign: 'center', width: '16em' }} />
                </DataTable>
              </h4>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2em', marginLeft: '82.5em' }} >
          <Button label="บันทึก" className="p-button-success" onClick={() => updatequartercharges(quartercharges[0].report_id, editquartercharges, checked)} />
        </div>
      </Card>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="แก้ไขผลตามตัวชี้วัด และบรรลุตามตัวชี้วัด" modal className="p-fluid"
        visible={visible1}
        footer={renderFooter1}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ผลตามตัวชี้วัด :</h3>
            </div>
            <div className="col-12 md:col-3">
              <InputText
                value={editresult}
                onChange={(e) => setEditresult(e.target.value)}
                style={{ width: '30em' }}
                placeholder="ผลตามตัวชี้วัด"
              />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>บรรลุตามตัวชี้วัด :</h3>
            </div>
            <div className="col-12 md:col-3">
              <h4>
                <Checkbox onChange={e => setChecked1(e.checked)} checked={checked1} />
              </h4>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขรายละเอียดความก้าวหน้า" modal className="p-fluid"
        visible={visible2}
        footer={renderFooter2}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>รายละเอียดความก้าวหน้า :</h3>
            </div>
            <div className="col-12 md:col-5">
              <InputText
                value={editdetail}
                onChange={(e) => setEditdetail(e.target.value)}
                style={{ width: '26em' }}
                placeholder="รายละเอียดความก้าวหน้า"
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        style={{ width: '450px', width: "50vw" }} header="เแก้ไขปัญหา/อุปสรรค" modal className="p-fluid"
        visible={visible3}
        footer={renderFooter3}
        onHide={onHide}
      >
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <h3>ปัญหา/อุปสรรค :</h3>
            </div>
            <div className="col-12 md:col-5">
              <InputText
                value={editproblem}
                onChange={(e) => setEditproblem(e.target.value)}
                style={{ width: '26em' }}
                placeholder="ปัญหา/อุปสรรค"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Editreporttwo