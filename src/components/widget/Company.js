/**
 * Created by nap on 17/9/26.
 */
import React from 'react'
import l from './Company.less'
import InputField from './reduxForm/InputField'
import { reduxForm } from 'redux-form'
import { Modal, Row, Col, notification, Select, Form } from 'antd'
import { required, mobile, pswRule } from './reduxForm/validate'
import { createTenants, updateTenants, listUsersforTenantId } from '../../services/common'
import { deepClone } from '../../utils/common'
import _ from 'underscore'

const {Option} = Select
const FormItem = Form.Item

const createValidate = (type, values) => {
  console.log(values)
  const errors = {}

  if (type === 'edit') {
    if (values.password) {
      errors.password = pswRule(values.password)
      if (values.password_repeat && values.password !== values.password_repeat) {
        errors.password_repeat = '两次密码不一致'
      }
    }
  }

  if (type === 'add') {
    if (values.password && values.password_repeat && values.password !== values.password_repeat) {
      errors.password_repeat = '两次密码不一致'
    }
  }

  return errors
}

export class CompanyDetail extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    data: {}
  }

  render () {
    const {onSubmit, data} = this.props

    return (
      <Modal
        visible
        width={470}
        title='公司详情'
        wrapClassName={l.company_detail}
        okText='重置密码'
        closable={false}
        onOk={onSubmit.bind(null, true)}
        onCancel={onSubmit}
      >
        <Row className={l.row}>
          <Col className={l.label} span={12}>公司名称：</Col>
          <Col className={l.text} span={12}>{data.company_name}</Col>
        </Row>
        <Row className={l.row}>
          <Col className={l.label} span={12}>联系人姓名：</Col>
          <Col className={l.text} span={12}>{data.contact_user_name}</Col>
        </Row>
        <Row className={l.row}>
          <Col className={l.label} span={12}>联系人电话：</Col>
          <Col className={l.text} span={12}>{data.contact_user_mobile}</Col>
        </Row>
        <Row className={l.row}>
          <Col className={l.label} span={12}>注册时间：</Col>
          <Col className={l.text} span={12}>{data.created_at}</Col>
        </Row>
        <Row className={l.row}>
          <Col className={l.label} span={12}>体验到期时间：</Col>
          <Col className={l.text} span={12}>{data.expire_date}</Col>
        </Row>
        {/* <Row className={l.row}> */}
        {/* <Col className={l.label} span={12}>最后登录时间：</Col> */}
        {/* <Col className={l.text} span={12}>456789</Col> */}
        {/* </Row> */}
      </Modal>
    )
  }
}

let handleTime = null

export class CompanyEdit extends React.Component {
  static defaultProps = {
    onSubmit: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      users: [],
      search: '',
      userLookup: {},
      help: '',
      loading: false
    }
  }

  handleSubmit = async (values) => {
    const {search} = this.state

    if (search === '') {
      this.setState({help: '请选择联系人'})
      return
    }

    try {
      this.setState({loading: true})
      const result = await updateTenants(values.id, _.pick(values, 'old_password', 'password', 'company_name', 'contact_user', 'expire_date'))
      this.setState({loading: false})

      if (result.id) {
        notification.success({message: '修改成功'})
        this.props.onSubmit(true)
      } else {
        notification.error({message: '修改失败', description: result.msg})
      }
    } catch (e) {
      this.setState({loading: false})
      console.log(e)
      notification.error({message: '错误', description: e.msg})
      throw e
    }
  }

  componentWillMount () {
    const {initialize, data} = this.props
    initialize(deepClone(data))
    this.setState({search: data.contact_user_name})
    this._loadUsers()
  }

  _loadUsers = async () => {
    const {data: {id}} = this.props
    const {search} = this.state

    try {
      const users = await listUsersforTenantId(id, search)
      const userLookup = {}
      users.items.map(item => {
        userLookup[item.id] = item
      })
      console.log(users)
      this.setState({users: users.items, userLookup})
    } catch (e) {
      console.log(e)
      notification.error({message: '错误', description: e.msg})
      throw e
    }
  }

  handleSearch = (search) => {
    console.log(search)
    clearTimeout(handleTime)
    this.setState({search}, () => {
      handleTime = setTimeout(this._loadUsers, 500)
    })
  }

  handleSelectChange = (value) => {
    console.log(value)
    const {change} = this.props
    const {userLookup} = this.state
    change('contact_user', value)
    change('contact_user_name', userLookup[value].name)
    change('contact_user_mobile', userLookup[value].mobile)
    this.setState({search: userLookup[value].name})
  }

  render () {
    const {onSubmit, handleSubmit} = this.props
    const {users, search, help, loading} = this.state

    const fields = [
      {label: '公司名称', name: 'company_name', placeholder: '请输入公司名称', validate: [required]},
      {
        label: '联系人姓名',
        name: 'contact_user_name',
        type: 'select',
        placeholder: '请选择联系人',
        validate: [required],
        options: users,
        onSelect: this.handleSelectChange,
        value: search,
        plusData: {
          mode: 'combobox',
          showArrow: false,
          filterOption: false,
          onSearch: this.handleSearch
        }
      },
      {label: '联系人电话', name: 'contact_user_mobile', placeholder: '请输入联系人电话', disabled: true},
      {
        label: '到期时间设置',
        name: 'expire_date',
        type: 'date',
        placeholder: '请选择时间',
        validate: [required],
        formatDate: 'YYYY-MM-DD HH:mm:ss'
      },
      // {label: '原始密码', name: 'old_password', type: 'password', placeholder: '请输入原始密码', validate: [required, pswRule]},
      {label: '新密码', name: 'password', type: 'password', placeholder: '请输入密码'},
      {
        label: '再次输入密码',
        name: 'password_repeat',
        type: 'password',
        placeholder: '请再次输入密码'
      }
    ]

    return (
      <Modal
        visible
        width={470}
        title='编辑公司信息'
        wrapClassName={l.company_detail}
        closable={false}
        confirmLoading={loading}
        onOk={handleSubmit(this.handleSubmit)}
        onCancel={onSubmit}
      >
        {
          fields.map((item, i) => {
            return item.type === 'select'
              ? <FormItem
                {...{
                  labelCol: {span: 6},
                  wrapperCol: {span: 14}
                }}
                label={item.label}
                validateStatus={help && 'error'}
                help={help}
                key={i}>
                <Select
                  {...item}
                  {...item.plusData}
                >
                  {
                    item.options.map((item, i) => {
                      return <Option value={item.id} key={i}>{item.name}</Option>
                    })
                  }
                </Select>
              </FormItem>
              : <InputField {...item} key={i} />
          })
        }
      </Modal>
    )
  }
}

CompanyEdit = reduxForm({ // eslint-disable-line
  form: 'edit',
  validate: createValidate.bind(null, 'edit')
})(CompanyEdit)

export class CompanyAdd extends React.Component {
  static defaultProps = {
    onSubmit: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  handleSubmit = async (values) => {
    try {
      this.setState({loading: true})
      const result = await createTenants(values)
      this.setState({loading: false})

      if (result.id) {
        notification.success({message: '创建成功'})
        this.props.onSubmit(true)
      } else {
        notification.error({message: '创建失败', description: result.msg})
      }
    } catch (e) {
      console.log(e)
      this.setState({loading: false})
      notification.error({message: '错误', description: e.msg})
      throw e
    }
  }

  render () {
    const {onSubmit, handleSubmit} = this.props
    const {loading} = this.state
    const fields = [
      {label: '公司名称', name: 'company_name', placeholder: '请输入公司名称', validate: [required]},
      {label: '联系人姓名', name: 'contact_user_name', placeholder: '请输入联系人姓名', validate: [required]},
      {label: '联系人电话', name: 'contact_user_mobile', placeholder: '请输入联系人电话', validate: [required, mobile]},
      {label: '新密码', name: 'password', type: 'password', placeholder: '请输入密码', validate: [required, pswRule]},
      {
        label: '再次输入密码',
        name: 'password_repeat',
        type: 'password',
        placeholder: '请再次输入密码',
        validate: [required, pswRule]
      }
    ]

    return (
      <Modal
        visible
        width={470}
        title='新增公司'
        wrapClassName={l.company_detail}
        closable={false}
        onOk={handleSubmit(this.handleSubmit)}
        confirmLoading={loading}
        onCancel={onSubmit}

      >
        {
          fields.map((item, i) => {
            return <InputField {...item} key={i} />
          })
        }
      </Modal>
    )
  }
}

CompanyAdd = reduxForm({ // eslint-disable-line
  form: 'add',
  validate: createValidate.bind(null, 'add')
})(CompanyAdd)
