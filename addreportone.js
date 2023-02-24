import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import Tabdetailreport from './Tabdetailreport';
import Tabproblem from './Tabproblem';

const Addreportone = () => {
  const location = useLocation()
  const [quartercharges, setQuartercharges] = useState([]);
  const [indic, setIndic] = useState([]);
  const [step, setStep] = useState([]);
  const [setDisplayBasic] = useState(false)
  const [value1, setValue1] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [rowsData1, setRowsData1] = React.useState([]);
  const [rowsData2, setRowsData2] = React.useState([]);
  let history = useHistory();
  console.log('project', location.state)

  const rowsInput1 = {
    detail: null
  }

  const rowsInput2 = {
    problem: null
  }

  useEffect(() => {
    getstep()
    getquartercharges()
    getindic()
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const addresult = (node) => {
    return <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{ width: '10em' }} />
  }

  const achieve = (node) => {
    return <Checkbox onChange={e => setChecked2(e.checked)} checked={checked2} />
  }

  const addTableRows1 = () => {
    setRowsData1([...rowsData1, rowsInput1])
  }

  const deleteTableRows1 = (index) => {
    const rows = [...rowsData1];
    rows.splice(index, 1);
    setRowsData1(rows);
  }

  const handleChange1 = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput1 = [...rowsData1];
    rowsInput1[index][name] = value;
    setRowsData1(rowsInput1);
  }

  const addTableRows2 = () => {
    setRowsData2([...rowsData2, rowsInput2])
  }

  const deleteTableRows2 = (index) => {
    const rows = [...rowsData2];
    rows.splice(index, 1);
    setRowsData2(rows);
  }

  const handleChange2 = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput2 = [...rowsData2];
    rowsInput2[index][name] = value;
    setRowsData2(rowsInput2);
  }

  const getquartercharges = () => {
    axios
      .get(`http://localhost:3001/quarterchargesone/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setQuartercharges(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', quartercharges)

  const getindic = () => {
    axios
      .get(`http://localhost:3001/indicreportone/${location.state.project_id}`, {})
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


  return (
    <div align="left">
      <h2 style={{ marginTop: '2em', marginLeft: '1em' }}>รายงานความก้าวหน้าไตรมาส 1</h2>
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
            <div className="col-12 md:col-3">
              <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{ width: '35em' }} placeholder="งบไตรมาสที่ 1" />
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
                  <Column field="cost" header="เป้าหมาย" style={{ textAlign: 'center', width: '10em' }} />
                  <Column body={addresult} header="ผลตามตัวชี้วัด" style={{ textAlign: 'center', width: '10em' }} />
                  <Column body={achieve} header="บรรลุตามตัวชี้วัด" />
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
                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}>
                </Checkbox>
              </h4>
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>รายละเอียดความก้าวหน้า :</h3>
            </div>
            <div className="col-12 md:col-5">
              <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{ width: '35em' }} placeholder="รายละเอียดความก้าวหน้า" />
            </div>
            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <Button type="button" onClick={addTableRows1} style={{ width: '15.5em' }}>+ เพิ่มรายละเอียดความก้าวหน้า</Button>
              </div>
            </div>
            <div className="col-12 md:col-6" style={{ marginLeft: '23em', marginBottom: '2em' }}>
              <Tabdetailreport rowsData={rowsData1} deleteTableRows={deleteTableRows1} handleChange={handleChange1} />
            </div>
          </div>
        </div>
        <div className="fit" style={{ marginLeft: '1.5em' }}>
          <div className="grid p-fluid">
            <div className="col-12 md:col-3">
              <h3>ปัญหา/อุปสรรค :</h3>
            </div>
            <div className="col-12 md:col-5">
              <InputText value={value1} onChange={(e) => setValue1(e.target.value)} style={{ width: '35em' }} placeholder="ปัญหา/อุปสรรค" />
            </div>
            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <Button type="button" onClick={addTableRows2} style={{ width: '12em' }}>+ เพิ่มอุปสรรค/ปัญหา</Button>
              </div>
            </div>
            <div className="col-12 md:col-6" style={{ marginLeft: '23em', marginBottom: '2em' }}>
              <Tabproblem rowsData={rowsData2} deleteTableRows={deleteTableRows2} handleChange={handleChange2} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2em', marginLeft: '76em' }} >
          <Button type="button" icon="pi pi-send" label='ส่ง' style={{ width: '7em' }} className="p-button-info" />
          <Button type="button" icon="pi pi-download" label='จัดเก็บ' className="p-button-help" style={{ marginLeft: '.4em' }} />
        </div>
      </Card>
    </div>
  );
}

export default Addreportone