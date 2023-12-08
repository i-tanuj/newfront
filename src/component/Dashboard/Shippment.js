import React from 'react'
import '../../css/shippment.css'
import CreateDispatch from './CreateDispatch'
import CreateDriver from './CreateDriver'
import CreateShipment from '../CreateShipment/CreateShipment'
import CreateHelper from '../CreateShipment/CreateHelper'
import CreateVehical from '../CreateShipment/CreateVehical'
import "react-datepicker/dist/react-datepicker.css";
import CreateCustomer from '../CreateShipment/CreateCustomer'
function Shippment() {
  return (
    
        	<div class="col-md-4">
							<div class="account-here mb-2">
								<div class="p-4 mb-3">
									  <div class="card-body">
									    	<p class="card-text text-center">Create New</p>
											<div className='d-flex account-here-btn'>
												<div class="w-50"><CreateDispatch/></div>
												<div class="w-50"> <CreateDriver/></div>
											</div>
											<div className='d-flex account-here-btn'>
												<div class="w-50"><CreateHelper/></div>
												<div class="w-50"><CreateVehical/></div>
											</div>
											<div className='account-here-btn text-center'>
												<div class="w-100 "><CreateCustomer/></div>
											</div>

									  </div>
								</div>
							</div>
							<div class="account-here">
								<div class="p-4 mb-3">
									  <div class="card-body">
									    	<p class="card-text text-center">You can create Shipments</p>
									    	{/* <div class="d-flex create-dispatcher-01 align-items-center"> */}
									    		{/* <div class="plus-icon">
								    				<a href="#"><img src="/Assets/dash/plus.png"/></a>
								    			</div> */}
								    			<div class="">
								    				{/* <p>Create New Shippment</p> */}
                                                    <CreateShipment/>
								    			</div>

                                                

                                                
									    	{/* </div> */}
									  </div>
                                      
								</div>
							</div>
						</div>
  
  )
}

export default Shippment