import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';

const Datareport = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [userproject, setUserproject] = useState([])
  const [value2, setValue2] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const [status, setStatus] = useState('');
  let history = useHistory();

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    'status': setStatus,
  }

  const Status = (node) => {
    if (node.status === 0) {
      return <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา" rounded></Tag>
    } else if (node.status === 1) {
      return <Tag className="mr-2" severity="info" value="รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ" rounded></Tag>
    } else if (node.status === 2) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย" rounded></Tag>
    } else if (node.status === 3) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารพิจารณา" rounded></Tag>
    } else if (node.status === 4) {
      return <Tag className="mr-2" severity="success" value="อนุมัติโครงการ" rounded></Tag>
    } else if (node.status === 5) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร" rounded></Tag>
    } else {
      return node.status
    }
  }

  const report1 = (node) => {
    if (node.status === 4 && node.report_one === 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reportone", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/addreportone", state: node })} />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreportone", state: node })} />
      </div>
    } else if (node.status === 4 && node.report_one !== 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reportone", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreportone", state: node })} />
      </div>
    } 
    else {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" disabled />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} disabled />
      </div>
    }
  }

  const report2 = (node) => {
    if (node.status === 4 && node.report_two === 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reporttwo", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/addreporttwo", state: node })} />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreporttwo", state: node })} />
      </div>
    } else if (node.status === 4 && node.report_two !== 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reporttwo", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreporttwo", state: node })} />
      </div>
    } else {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" disabled />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} disabled />
      </div>
    }
  }

  const report3 = (node) => {
    if (node.status === 4 && node.report_three === 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reportthree", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/addreportthree", state: node })} />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreportthree", state: node })} />
      </div>
    } else if (node.status === 4 && node.report_three !== 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reportthree", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreportthree", state: node })} />
      </div>
    } else {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" disabled />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} disabled />
      </div>
    }
  }

  const report4 = (node) => {
    if (node.status === 4 && node.report_four === 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reportfour", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/addreportfour", state: node })} />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreportfour", state: node })} />
      </div>
    } else if (node.status === 4 && node.report_four !== 0) {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" onClick={() => history.push({ pathname: "/home/reportfour", state: node })} />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} onClick={() => history.push({ pathname: "/home/editreportfour", state: node })} />
      </div>
    }
    else {
      return <div>
        <Button type="button" icon="pi pi-search" className="p-button-info" disabled />
        <Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em' }} disabled />
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em' }} disabled />
      </div>
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/fiscalyear", {})
      .then((res) => {
        setFiscalyear(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const onsetFiscalyear = (e) => {
    setSelectedFiscalyear(e.value);
  }

  useEffect(() => {
    Project()
  }, []);

  const Project = () => {
    axios
      .get("http://localhost:3001/project", {})
      .then((res) => {
        setProject(res.data)
        console.log('log', res)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/userproject`, {})
      .then((res) => {
        console.log(res.data)
        setUserproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <div className="text-left">
      <div className="fit">
        <h4>ปีงบประมาณ</h4>
        <Dropdown value={selectedfiscalyear}
          options={fiscalyear}
          style={{ width: '10em' }}
          onChange={onsetFiscalyear}
          optionLabel="fiscalyear"
          placeholder="ทุกปี" />
        <h4>สถานะ</h4>
        <Dropdown value={value2} style={{ width: '30em' }} onChange={(e) => setValue2(e.target.value)} placeholder="ทุกสถานะ" />
        <Button label="ค้นหา" className="p-button-success" style={{ marginLeft: '.8em' }} />
      </div>
      <div style={{ marginTop: "2.5em" }}>
        <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
          <Column field="project_name" header="ชื่อโครงการ" />
          <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "9.5%" }} />
          <Column body={report1} header="รายงานความก้าวหน้าไตรมาส 1" style={{ textAlign: 'center', width: "17%" }} />
          <Column body={report2} header="รายงานความก้าวหน้าไตรมาส 2" style={{ textAlign: 'center', width: "17%" }} />
          <Column body={report3} header="รายงานความก้าวหน้าไตรมาส 3" style={{ textAlign: 'center', width: "17%" }} />
          <Column body={report4} header="รายงานความก้าวหน้าไตรมาส 4" style={{ textAlign: 'center', width: "17%" }} />
        </DataTable>
      </div>
    </div>
  );
}

export default Datareport