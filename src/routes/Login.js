/**
 * Created by nap on 17/9/26.
 */
import React from 'react'
import { connect } from 'dva'
import InputField from '../components/widget/reduxForm/InputField'
import { Button, notification } from 'antd'
import { reduxForm, SubmissionError } from 'redux-form'
import l from './Login.less'
import { login } from '../services/user'
import { required } from '../components/widget/reduxForm/validate'
import _ from 'underscore'
import { routerRedux } from 'dva/router'
import { saveUserInfo } from '../actions/user'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  handleSubmit = async (values) => {
    const {dispatch} = this.props
    this.setState({submitting: true})
    try {
      const result = await login(values)
      console.log(result)
      result.username = values.username
      this.setState({submitting: false})

      if (result.token) {
        dispatch(saveUserInfo(result))
        dispatch(routerRedux.replace('/index'))
      } else {
        const err = {}

        _.each(result, (v, k) => {
          if (v) {
            err[k] = v[0]
          }
        })

        if (result.non_field_errors) {
          err.username = result.non_field_errors.join()
        }

        return Promise.reject(new SubmissionError(err))
      }
    } catch (e) {
      console.log(e)
      this.setState({submitting: false})
      notification.error({message: '错误', description: e.msg})
      throw e
    }
  }

  render () {
    const {handleSubmit} = this.props
    const {submitting} = this.state
    return (
      <div className={l.login}>
        <div className={l.box}>
          <h3>登录</h3>
          <div className={l.form}>
            <InputField
              name='username'
              placeholder='请输入手机号/账号'
              validate={[required]}
              onPressEnter={handleSubmit(this.handleSubmit)} />
            <InputField
              name='password'
              type='password'
              placeholder='密码'
              onPressEnter={handleSubmit(this.handleSubmit)}
              validate={[required]} />
            <Button
              type='primary'
              loading={submitting}
              disabled={submitting}
              onClick={handleSubmit(this.handleSubmit)}>登录</Button>
          </div>
        </div>
      </div>
    )
  }
}

Login = reduxForm({ // eslint-disable-line
  form: 'login'
})(Login)

export default connect()(Login)
