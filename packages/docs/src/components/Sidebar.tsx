import React, { FC } from 'react'

import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CSidebar,
  CSidebarBrand,
} from '@coreui/react/src'
import { SidebarNav } from '.'

import { AppContext } from './../AppContext'

import items from './../nav'

interface SidebarProps {
  currentRoute: string
}

const Sidebar: FC<SidebarProps> = ({ ...props }) => {
  return (
    <AppContext.Consumer>
      {(context) => (
        <CSidebar
          className="docs-sidebar border-end ps-xl-4 elevation-0"
          position="fixed"
          size="lg"
          visible={context.sidebarVisible}
          onVisibleChange={(value: boolean) => {
            context.setSidebarVisible && context.setSidebarVisible(value)
          }}
        >
          <CSidebarBrand className="justify-content-start ps-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 615 134"
              height={50}
              className="d-block mt-4 mb-5"
            >
              <g fill="#00a1ff">
                <path d="m361.773 90.151-8.768-20.736a.25.25 0 0 0-.255-.191h-9.985a.226.226 0 0 0-.256.255v20.543a.566.566 0 0 1-.64.641h-1.216a.565.565 0 0 1-.64-.64v-43.52a.566.566 0 0 1 .64-.64h12.544a9.979 9.979 0 0 1 7.744 3.23 12.204 12.204 0 0 1 2.944 8.546 12.439 12.439 0 0 1-2.24 7.584 9.37 9.37 0 0 1-6.08 3.744c-.17.086-.213.191-.127.32l8.704 20.608.063.256c0 .341-.191.511-.575.511h-1.153a.703.703 0 0 1-.704-.51Zm-19.264-41.793v18.496a.226.226 0 0 0 .256.257h10.304a7.669 7.669 0 0 0 6.017-2.593 9.878 9.878 0 0 0 2.303-6.815 10.286 10.286 0 0 0-2.272-6.975 7.601 7.601 0 0 0-6.048-2.625h-10.304a.226.226 0 0 0-.256.255ZM401.082 48.102H381.05a.226.226 0 0 0-.256.256v18.496a.226.226 0 0 0 .256.257h13.824a.566.566 0 0 1 .64.64v.96a.566.566 0 0 1-.64.64H381.05a.226.226 0 0 0-.256.256v18.56a.226.226 0 0 0 .256.256h20.032a.567.567 0 0 1 .64.64v.96a.566.566 0 0 1-.64.64h-22.144a.566.566 0 0 1-.64-.64v-43.52a.566.566 0 0 1 .64-.64h22.144a.566.566 0 0 1 .64.64v.96a.566.566 0 0 1-.64.64ZM438.802 90.151l-2.431-8.832a.296.296 0 0 0-.32-.192h-16.768a.295.295 0 0 0-.32.192l-2.368 8.768a.658.658 0 0 1-.704.576h-1.216a.588.588 0 0 1-.48-.191.582.582 0 0 1-.096-.513l12.031-43.584a.644.644 0 0 1 .704-.512h1.6a.644.644 0 0 1 .704.512l12.16 43.584.065.192c0 .342-.214.512-.64.512h-1.217a.643.643 0 0 1-.704-.512ZM419.7 78.92a.303.303 0 0 0 .223.096h15.489a.304.304 0 0 0 .223-.096c.065-.065.074-.117.033-.16l-7.872-28.928c-.043-.085-.086-.128-.128-.128s-.086.043-.128.128l-7.872 28.928c-.043.043-.033.095.032.16ZM456.357 87.911a11.637 11.637 0 0 1-3.328-8.704V57.19a11.414 11.414 0 0 1 3.36-8.575 12.09 12.09 0 0 1 8.8-3.265 12.253 12.253 0 0 1 8.865 3.232 11.39 11.39 0 0 1 3.36 8.608v.64a.566.566 0 0 1-.641.641l-1.28.064q-.64 0-.64-.577v-.832a9.287 9.287 0 0 0-2.656-6.912 10.67 10.67 0 0 0-14.016 0 9.284 9.284 0 0 0-2.656 6.912V79.4a9.282 9.282 0 0 0 2.656 6.912 10.673 10.673 0 0 0 14.016 0 9.286 9.286 0 0 0 2.656-6.912v-.768q0-.576.64-.575l1.28.063a.566.566 0 0 1 .64.64v.511a11.498 11.498 0 0 1-3.36 8.64 13.626 13.626 0 0 1-17.696 0ZM514.193 46.503v.96a.566.566 0 0 1-.64.64H502.8a.226.226 0 0 0-.256.256v41.663a.566.566 0 0 1-.64.641h-1.216a.565.565 0 0 1-.64-.64V48.357a.227.227 0 0 0-.256-.255h-10.176a.565.565 0 0 1-.64-.64v-.96a.566.566 0 0 1 .64-.64h23.936a.566.566 0 0 1 .64.64ZM521.822 89.51a2.835 2.835 0 0 1-.8-2.047 2.923 2.923 0 0 1 .8-2.112 2.758 2.758 0 0 1 2.08-.833 2.847 2.847 0 0 1 2.944 2.945 2.754 2.754 0 0 1-.832 2.08 2.921 2.921 0 0 1-2.112.8 2.754 2.754 0 0 1-2.08-.832ZM542.16 88.007a11.31 11.31 0 0 1-3.2-8.416v-5.44a.566.566 0 0 1 .64-.64h1.217a.567.567 0 0 1 .64.64v5.504a9.144 9.144 0 0 0 2.528 6.72 8.973 8.973 0 0 0 6.687 2.56 8.79 8.79 0 0 0 9.28-9.28V46.504a.566.566 0 0 1 .64-.64h1.217a.566.566 0 0 1 .64.64V79.59a11.252 11.252 0 0 1-3.233 8.416 13.062 13.062 0 0 1-17.055 0ZM580.106 88.103a10.482 10.482 0 0 1-3.36-8.127v-1.793a.566.566 0 0 1 .64-.64h1.088a.566.566 0 0 1 .64.64v1.6a8.544 8.544 0 0 0 2.752 6.655 10.536 10.536 0 0 0 7.36 2.496 9.876 9.876 0 0 0 6.976-2.367 8.215 8.215 0 0 0 2.56-6.336 8.397 8.397 0 0 0-1.12-4.416 11.383 11.383 0 0 0-3.328-3.392 71.626 71.626 0 0 0-6.176-3.712 71.302 71.302 0 0 1-6.24-3.84 12.174 12.174 0 0 1-3.424-3.68 10.257 10.257 0 0 1-1.28-5.345 9.86 9.86 0 0 1 3.072-7.744 12.012 12.012 0 0 1 8.32-2.752q5.695 0 8.96 3.105a10.823 10.823 0 0 1 3.264 8.223v1.601a.566.566 0 0 1-.64.64h-1.152a.565.565 0 0 1-.64-.64v-1.471a8.865 8.865 0 0 0-2.624-6.689 9.994 9.994 0 0 0-7.232-2.528 9.365 9.365 0 0 0-6.528 2.144 7.822 7.822 0 0 0-2.368 6.112 7.8 7.8 0 0 0 1.024 4.16 10.376 10.376 0 0 0 3.008 3.04 62.829 62.829 0 0 0 5.952 3.488 71.058 71.058 0 0 1 6.72 4.256 13.454 13.454 0 0 1 3.648 3.936 10.049 10.049 0 0 1 1.28 5.184 10.714 10.714 0 0 1-3.264 8.191q-3.263 3.073-8.832 3.072-5.697 0-9.057-3.072Z" />
              </g>
              <g fill="var(--cui-body-color, currentColor)">
                <path d="m99.59 36.058-39-22.517a12 12 0 0 0-12 0l-39 22.517a12.034 12.034 0 0 0-6 10.392v45.033a12.033 12.033 0 0 0 6 10.393l39 22.516a12 12 0 0 0 12 0l39-22.516a12.033 12.033 0 0 0 6-10.393V46.45a12.034 12.034 0 0 0-6-10.392Zm-2 55.425a4 4 0 0 1-2 3.464l-39 22.517a4 4 0 0 1-4 0l-39-22.517a4 4 0 0 1-2-3.464V46.45a4 4 0 0 1 2-3.464l39-22.517a4 4 0 0 1 4 0l39 22.517a4 4 0 0 1 2 3.464Z" />
                <path d="M77.612 82.005h-2.866a4.001 4.001 0 0 0-1.925.493l-17.28 9.485L35.59 80.465V57.487L55.54 45.97l17.29 9.455a4 4 0 0 0 1.919.49h2.863a2 2 0 0 0 2-2v-2.712a2 2 0 0 0-1.04-1.754L59.383 38.952a8.039 8.039 0 0 0-7.842.09L31.59 50.56a8.024 8.024 0 0 0-4 6.929v22.976a8 8 0 0 0 4 6.928l19.95 11.519a8.043 8.043 0 0 0 7.843.087l19.19-10.53a2 2 0 0 0 1.038-1.754v-2.71a2 2 0 0 0-1.999-2ZM172.335 45.362a15.017 15.017 0 0 0-15 15v17.277a15 15 0 0 0 30 0V60.36a15.017 15.017 0 0 0-15-15Zm7 32.277a7 7 0 0 1-14 0V60.36a7 7 0 0 1 14 0ZM135.67 53.421a7.01 7.01 0 0 1 7.867 6.075.99.99 0 0 0 .984.865h6.03a1.01 1.01 0 0 0 1-1.097 15.018 15.018 0 0 0-15.717-13.883 15.288 15.288 0 0 0-14.244 15.416v16.407a15.288 15.288 0 0 0 14.245 15.416 15.018 15.018 0 0 0 15.716-13.884 1.01 1.01 0 0 0-.999-1.097h-6.03a.99.99 0 0 0-.984.865 7.01 7.01 0 0 1-7.868 6.075 7.164 7.164 0 0 1-6.08-7.184v-16.79a7.164 7.164 0 0 1 6.08-7.184ZM218.512 72.928a12.158 12.158 0 0 0 7.185-11.077v-3.702A12.15 12.15 0 0 0 213.547 46H196.59a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V74h6.622l7.915 17.414a1 1 0 0 0 .91.586h6.591a1 1 0 0 0 .91-1.414Zm-.815-11.077a4.154 4.154 0 0 1-4.15 4.149h-9.85V54h9.85a4.154 4.154 0 0 1 4.15 4.15ZM260.59 46h-26a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-19V72h13a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-13V54h19a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1ZM298.59 46h-6a1 1 0 0 0-1 1v22.647a7.007 7.007 0 1 1-14 0V47a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v22.647a15.003 15.003 0 1 0 30 0V47a1 1 0 0 0-1-1Z" />
                <rect width="8" height="38" x="307.59" y="46" rx="1" />
              </g>
            </svg>
          </CSidebarBrand>
          <div className="text-body-secondary ms-3 me-5 mb-2 small fw-semibold">Framework:</div>
          <CDropdown className="ms-3 me-5 mb-4">
            <CDropdownToggle color="primary" variant="outline">
              React.js
            </CDropdownToggle>
            <CDropdownMenu className="w-100">
              <CDropdownItem href="https://coreui.io/angular/docs/" target="_blank">
                Angular
              </CDropdownItem>
              <CDropdownItem href="https://coreui.io/docs/" target="_blank">
                JavaScript / Vanilla JS
              </CDropdownItem>
              <CDropdownItem href="https://coreui.io/vue/docs/" target="_blank">
                Vue.js
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <SidebarNav items={items} currentRoute={props.currentRoute} />
        </CSidebar>
      )}
    </AppContext.Consumer>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
