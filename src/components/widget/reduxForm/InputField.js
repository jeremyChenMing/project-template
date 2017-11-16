import React, { PropTypes } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Radio,
  Select,
  Checkbox,
  TimePicker,
  DatePicker
} from 'antd'

import { Field } from 'redux-form'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const {MonthPicker} = DatePicker

class InputField extends React.Component {
  constructor (props) {
    super(props)
    this.validateStatus = this.validateStatus.bind(this)
    this.showErrMessage = this.showErrMessage.bind(this)
    this.renderField = this.renderField.bind(this)
    this.state = {
      needReload: false
    }
  }

  static propTypes = {
    formItemLayout: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
    format: PropTypes.string,
    formatDate: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    validate: PropTypes.array,
    onKeyUp: PropTypes.func,
    size: PropTypes.string,
    inputStyle: PropTypes.object,
    options: PropTypes.array,
    rows: PropTypes.number,
    id: PropTypes.string,
    defaultValue: PropTypes.any,
    optionKey: PropTypes.string,
    optionValue: PropTypes.string,
    multiple: PropTypes.bool,
    defaultRadio: PropTypes.any,
    showSearch: PropTypes.bool,
    onPressEnter: PropTypes.func,
    plusData: PropTypes.any

  }
  static defaultProps = {
    formItemLayout: {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    },
    placeholder: '',
    type: 'text',
    format: 'HH:mm:ss',
    formatDate: 'YYYY/MM/DD',
    validate: [],
    size: 'default',
    rows: 6,
    id: '',
    disabled: false,
    inputStyle: {},
    onKeyUp: () => {},
    onPressEnter: () => {},
    options: [],
    defaultValue: '',
    optionKey: 'uuid',
    optionValue: 'name',
    multiple: false,
    showSearch: false,
    defaultRadio: '',
    optionFilterProp: null,
    min: 0,
    sup: false,
    plusData: {}
    // optDis          : -1,
  }

  validateStatus (field) {
    if (field && field.meta && field.meta.touched && field.meta.error) {
      return 'error'
    } else {
      return null
    }
  }

  showErrMessage (field) {
    if (field && field.meta && field.meta.touched && field.meta.error) {
      return field.meta.error
    } else {
      return ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const {options, optDis} = nextProps
    if (options && options.length !== this.props.options.length) {
      this.setState({
        needReload: true
      })
    } else if (optDis && optDis !== this.props.optDis) {
      this.setState({
        needReload: true
      })
    }
  }

  renderField (field) {
    let {formItemLayout, label, format, rows, id, formatDate, placeholder, type, onKeyUp, inputStyle, size, options, multiple, disabled, defaultValue, optionKey, optionValue, showSearch, optionFilterProp, has, min, disabledDate, optDis, sup, onPressEnter, plusData} = this.props
    if (type && type === 'select') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <Select
            multiple={multiple}
            value={field.input.value ? field.input.value : undefined}
            disabled={disabled}
            onChange={(value) => {
              if (multiple && value.join(',').indexOf('all') !== -1) {
                value = ['all']
              }
              if (this.props.onChange) {
                this.props.onChange(value, field)
              } else {
                field.input.onChange(value)
              }
            }}
            placeholder={placeholder}
            size={size}
            style={inputStyle}
            showSearch={showSearch}
            optionFilterProp={optionFilterProp}
            {...plusData}>
            {options.map((option, i) => {
              return (
                <Option key={i} disabled={option[optionKey] === optDis}
                  value={option[optionKey]}>{option[optionValue]}</Option>
              )
            })}
          </Select>
        </FormItem>
      )
    } else if (type && type === 'radio') {
      console.log('-------', field.input)
      return (
        <FormItem
          className='formItems'
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <RadioGroup
            {...field.input}
            {...plusData}>
            {options.map((option, i) => {
              return (
                <Radio key={i} value={option.key} style={inputStyle}>{option.name}</Radio>
              )
            })}
          </RadioGroup>
        </FormItem>
      )
    } else if (type && type === 'cascader') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <Cascader
            onChange={(value) => {
              if (value && value.length < 1) {
                field.input.onChange('')
              } else {
                field.input.onChange(value)
              }
            }}
            size={size}
            options={options}
            style={inputStyle}
            placeholder={placeholder}
            {...plusData}
          />
        </FormItem>
      )
    } else if (type && type === 'time') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <TimePicker
            onChange={(time) => {
              const value = time.format(format)
              field.input.onChange(value)
            }}
            value={field.input.value ? moment(field.input.value, format) : undefined}
            placeholder={placeholder}
            size={size}
            style={inputStyle}
            format={format}
            {...plusData} />
        </FormItem>
      )
    } else if (type && type === 'date') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <DatePicker
            onChange={(time, timeString) => {
              const value = time.format(formatDate)
              field.input.onChange(value)
            }}
            // defaultValue={field.input.value ? moment(field.input.value, format) : undefined}
            disabledDate={disabledDate || null}
            defaultValue={field.input.value ? moment(field.input.value, formatDate) : null}
            placeholder={placeholder}
            size={size}
            style={inputStyle}
            {...plusData} />
        </FormItem>
      )
    } else if (type && type === 'month') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <MonthPicker
            onChange={(time, timeString) => {
              const value = time.format(formatDate)
              field.input.onChange(value)
            }}
            defaultValue={field.input.value ? moment(field.input.value, format) : undefined}
            placeholder={placeholder}
            size={size}
            style={inputStyle}
            {...plusData} />
        </FormItem>
      )
    } else if (type && type === 'checkboxGroup') {
      return (
        <FormItem className='formItems'
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <CheckboxGroup
            onChange={field.input.onChange}
            options={options}
            value={field.input.value ? field.input.value : null} />
        </FormItem>
      )
    } else if (type && type === 'textarea') {
      return (
        <FormItem
          className={has || 'formItems'}
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <Input
            onChange={field.input.onChange} type='textarea'
            value={field.input.value ? field.input.value : undefined}
            placeholder={placeholder}
            id={id}
            rows={rows}
            style={inputStyle}
            {...plusData} />
        </FormItem>
      )
    } else if (type && type === 'hidden') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)} style={{'display': 'none'}}>
          <Input
            {...field.input}
            placeholder={placeholder}
            type={type}
            onKeyUp={onKeyUp}
            style={inputStyle}
            size={size}
            {...plusData} />
        </FormItem>
      )
    } else if (type && type === 'number') {
      const value = field.input.value
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <InputNumber
            disabled={disabled}
            placeholder={placeholder}
            style={inputStyle}
            value={value}
            min={min}
            size={size}
            onChange={(value) => {
              console.log('hahhahahahhaha0-----------{...field.input}', value)
              if (this.props.onChange) {
                this.props.onChange(value, field)
              } else {
                field.input.onChange(value)
              }
            }}
            {...plusData} /> { sup ? <span>m<sup>2</sup></span> : null}
        </FormItem>
      )
    } else if (type && type === 'disnum') {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <Input
            {...field.input}
            value={field.input.value ? field.input.value : defaultValue}
            onChange={(value) => {
              // if (this.props.onChange) {
              //     this.props.onChange(value, field);
              // } else {
              //  console.log(value.target.value,'@@')
              //     field.input.onChange(value);
              // }
              field.input.onChange(value.target.value.replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, ''))
            }}
            disabled={disabled}
            placeholder={placeholder}
            style={inputStyle}
            size={size}
            {...plusData} />
        </FormItem>
      )
    } else if (type && type === 'files') {
      console.log('%cfield', 'color:red', field)
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <ul style={{display: 'table-cell'}}>
            {
              [''].map((item, index) => {
                return (
                  <li key={index} style={{
                    width: 50,
                    height: 50,
                    verticalAlign: 'top',
                    display: 'inline-block',
                    border: '1px solid #eaeaea',
                    lineHeight: '50px',
                    marginRight: '15px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    <span className='upvi-icon' style={{color: '#05419D', fontSize: '20px'}}>&#xe6a4;</span>
                  </li>
                )
              })
            }
            <li style={{
              width: 50,
              height: 50,
              verticalAlign: 'top',
              display: 'inline-block',
              border: '1px solid #eaeaea',
              lineHeight: '50px',
              marginRight: '15px',
              textAlign: 'center',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              <span className='upvi-icon' style={{color: '#05419D', fontSize: '20px'}}>&#xe699;</span>
            </li>
            <li style={{
              width: 60,
              height: 50,
              verticalAlign: 'top',
              textAlign: 'center',
              display: 'inline-block',
              border: '1px solid transparent',
              paddingTop: '12px'
            }}>
              <p style={{fontSize: '12px', color: '#9b9b9b'}}>支持格式</p>
              <p style={{fontSize: '12px', color: '#9b9b9b'}}>pdf、jpg</p>
            </li>
          </ul>
        </FormItem>
      )
    } else {
      return (
        <FormItem
          {...formItemLayout}
          label={label}
          validateStatus={this.validateStatus(field)}
          help={this.showErrMessage(field)}>
          <Input
            {...field.input}
            value={field.input.value ? field.input.value : defaultValue}
            onChange={(value) => {
              if (this.props.onChange) {
                this.props.onChange(value, field)
              } else {
                field.input.onChange(value)
              }
            }}
            onFocus={
              (value) => {
                if (this.props.onFocus) {
                  this.props.onFocus(value, field)
                } else {
                  field.input.onFocus(value)
                }
              }
            }
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            onKeyUp={onKeyUp}
            style={inputStyle}
            onPressEnter={onPressEnter}
            size={size}
            {...plusData} />
        </FormItem>
      )
    }
  }

  render () {
    const {label, name, type, validate} = this.props
    const {needReload} = this.state
    if (needReload) {
      return (
        <Field name={name} label={label} type={type} component={(field) => {
          return this.renderField(field)
        }} validate={validate} />
      )
    } else {
      return (
        <Field name={name} label={label} type={type} component={this.renderField} validate={validate} />
      )
    }
  }
}

export default InputField
