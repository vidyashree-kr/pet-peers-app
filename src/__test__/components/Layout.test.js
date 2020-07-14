import React from 'react'
import {mount,shallow} from 'enzyme'
import Layout from '../../application/Layout'
import { isType } from 'graphql'

describe('Given Component:Layout',()=>{
    describe('should render Layout',()=>{
it('should initialize render',()=>{
let wrapper=mount(<Layout/>)
expect(wrapper).toHaveLength(1)
})
    })
})