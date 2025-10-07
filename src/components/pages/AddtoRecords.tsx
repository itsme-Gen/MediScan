    import React, { useState } from 'react'
    import Appbar from '../props/Appbar'
    import { Activity, ActivitySquare, ArrowBigLeft, ArrowBigRight, CircleUser, Dna, Heart, HeartPulse,
        Phone, Pill, Stethoscope, Syringe, ThermometerSnowflake, User, UserPlus, Wind } from 'lucide-react'
    import Sidebar from '../props/Sidebar'

    const AddtoRecords = () => {
        const[step, setStep] = useState<number>(1);

        const nextStep = (()=>{
            setStep(prev => prev + 1)
        })

        const prevStep = (() =>{
            setStep(prev => prev - 1)
        })

    return (
        <div className='addToRecords h-screen'>
        <Sidebar/>
        
            <div className="main-content flex-1 flex-col ml-70">
                <Appbar
                    iconTitle={UserPlus}
                    title='Add to Records'
                    firstName='Juan'
                    lastName='Dela Cruz'
                    role='Doctor'
                    icon={CircleUser}
                />
                
                <div className="medical-info p-15 ">
                    <div className="title ">
                        <h1 className='text-4xl font-semibold text-primary'>Medical Information</h1>
                        <p className='text-secondary'>Complete patient medical profile for Maria Santos Dela Cruz</p>
                    </div>

                    <div className="patient-info-card border border-gray-300 mt-10 rounded-lg">
                        <div className="title flex flex-cols gap-2 items-center m-5">
                            <User className='text-secondary'/>
                            <h3 className='text-2xl font-semibold text-primary'>Patient Information</h3>
                        </div>

                        <div className="patient-info flex flex-wrap justify-between px-10 mb-10">
                                <div className="full-name">
                                    <h3 className='font-semibold'>Full Name</h3>
                                    <p>Maria Santos Dela Cruz</p>
                                </div>

                                <div className="birthDate">
                                    <h3 className='font-semibold'>BirthDate</h3>
                                    <p>1990-01-29</p>
                                </div>

                                <div className="gender">
                                    <h1 className='font-semibold'>Gender</h1>
                                    <p>Female</p>
                                </div>

                                <div className="idNumber">
                                    <h3 className='font-semibold'>ID Number</h3>
                                    <p>123456789</p>
                                </div>
                        </div>
                    </div>

            <form>
                    {/*contact Information*/}
                    {step ===1 &&(
                    <>
                    <div className="contact-info-card border border-gray-300 mt-10 rounded-lg">               
                        <div className="title flex flex-col m-5">
                            <div className="main-text flex flex-cols items-center gap-2">
                                <Phone className='text-secondary h-5'/>
                                <h3 className='text-2xl font-semibold text-primary'>Contact Information</h3>
                            </div>
                        
                            <div className="sub-text">
                                <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                            </div>
                        </div>

                        <div className="contact-info flex justify-center items-center">
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-10 mb-10 w-[90%]">
                                <div className="email-address">
                                    <h3 className='font-semibold text-sm mb-1'>Email Address</h3>
                                    <input 
                                    className='border border-gray-500 outline-primary p-2 rounded'
                                    type="email"
                                    placeholder='e.g. juan@gmail.com'
                                    />
                                </div>

                                <div className="home-address">
                                    <h3 className='font-semibold text-sm mb-1'>Home Address</h3>
                                    <input 
                                    className='border border-gray-500 outline-primary p-2 rounded'
                                    type="text"
                                    placeholder='e.g 123 Mabini St., Quezon City'
                                    />
                                </div>

                                <div className="contact-number">
                                    <h3 className='font-semibold text-sm mb-1'>Contact number</h3>
                                    <input 
                                    className='border border-gray-500 outline-primary p-2 rounded'
                                    type="number"
                                    placeholder='+639 xxx xxx xxx'
                                    />
                                </div>

                                <div className="emergency-contact">
                                    <h3 className='font-semibold text-sm mb-1'>Emergency contact number</h3>
                                    <input 
                                    className='border border-gray-500 outline-none p-2 rounded'
                                    type="number"
                                    placeholder='+639 xxx xxx xxx'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Reason for Visit */}
                    <div className="reason-for-visit-card border border-gray-300 mt-10 rounded-lg">

                        <div className="title flex flex-col m-5">
                            <div className="main-text flex flex-cols items-center gap-2">
                                <Stethoscope className='text-secondary h-5'/>
                                <h3 className='text-2xl font-semibold text-primary'>Reason for visit</h3>
                            </div>
                        </div>

                        <div className="text-area px-10 mb-5">
                            <textarea
                                required
                                id="message"
                                name="reasonForVisit"
                                placeholder="Type something here..."
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        
                    </div>

                    {/* Vital Sign */}

                    
                    <div className="vital-info-card border border-gray-300 mt-10 rounded-lg">
                        <div className="title flex flex-col m-5">
                            <div className="main-text flex flex-cols items-center gap-2">
                                <Activity className='text-secondary h-5'/>
                                <h3 className='text-2xl font-semibold text-primary'>Vital Sign</h3>
                            </div>

                            <div className="sub-text">
                                <p className='text-sm text-gray-500'><em>All fields are required*</em></p>
                            </div>
                        </div>

                        <div className="vital-info-card flex justify-center">
                            <div className="vital-info grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-x-5 mb-10">
                                <div className="container">
                                    <div className="body-temperature flex flex-cols items-center mb-2"> 
                                        <ThermometerSnowflake className='h-4'/>
                                        <h3 className='text-sm font-semibold'>Body Temperature</h3>
                                    </div>

                                    <div className="input-fields">
                                        <input
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type='text'
                                        required
                                        placeholder='36.5°C – 37.5°C'
                                        />
                                    </div>
                                </div>
                            
                                <div className="container">
                                    <div className="heart-rate flex flex-cols items-center mb-2">
                                        <HeartPulse className='h-4'/>
                                        <h3 className='text-sm font-semibold'>Heart Pulse</h3>
                                    </div>

                                    <div className="input-fields">
                                        <input
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        required
                                        type='text'
                                        placeholder='60 – 100 bpm'
                                        />
                                    </div>
                                </div>

                                <div className="container">
                                    <div className="respitory-rate flex flex-cols items-center mb-2">
                                        <Wind className='h-4'/>
                                        <h3 className='text-sm font-semibold'>Respitory rate</h3>
                                    </div>

                                    <div className="input-fields">
                                        <input
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        required
                                        type='text'
                                        placeholder='12 – 20 breaths/min'
                                        />
                                    </div>
                                </div>
                                
                                <div className="container">
                                    <div className="respitory-rate flex flex-cols items-center mb-2">
                                        <ActivitySquare className='h-4'/>
                                        <h3 className='text-sm font-semibold'>Respitory rate</h3>
                                    </div>

                                    <div className="input-fields">
                                        <input
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        required
                                        type='text'
                                        placeholder='12 – 20 breaths/min'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Medication*/}

                    <div className="medication-info-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Pill className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>Current Medication</h3>
                                </div>

                                <div className="sub-text">
                                    <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                </div>
                            </div>

                            <div className="medication-info flex justify-center mb-10">
                                <div className="grid-container gap-3 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%]"> 

                                    <div className="container">
                                        <label className='text-sm font-semibold' htmlFor="medicationName">Medication Name</label>
                                        <input
                                        name='medicationName'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type='text'
                                        placeholder='Medication Name'
                                        />
                                    </div>
                                
                                <div className="container">
                                        <label className='text-sm font-semibold' htmlFor="dateStarted">Data Started</label>
                                        <input
                                        name='dateStarted'
                                        className='p-2 rounded border border-gray-500 outline-primary w-[190px]'
                                        type='date'
                                        placeholder='Date started'
                                        />
                                    </div>

                                <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="dosage">Dosage</label>
                                        <input
                                        name='dosage'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type='text'
                                        placeholder='Dosage'
                                        />
                                    </div>

                                    <div className="container">
                                        <label className='text-sm font-semibold' htmlFor="frequency">Frequency</label>
                                        <input
                                        name='frequency'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type='text'
                                        placeholder='Frequency'
                                        />
                                    </div>

                                    <div className="container">
                                        <button 
                                        className='bg-primary p-2 rounded border border-gray-500 outline-primary w-full text-white text-md'
                                        >
                                        +
                                        </button>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                            <div className="button-container flex justify-center items-center m-5">
                            <button 
                            className='bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2'
                                onClick={(e) =>{
                                    e.preventDefault();
                                    nextStep()
                                }}>
                                Next
                                <ArrowBigRight/>
                                </button>
                            </div>
                    </>
                )}

                {step ===2 &&(
                    <>
                    {/*Meical History */}
                        <div className="medical-history-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Heart className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>Medical History</h3>
                                </div>

                                <div className="sub-text">
                                    <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                </div>
                            </div>

                            <div className="medical-history-info flex justify-center mb-10">
                                <div className="grid-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-5">
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="conditionName">Conditon Name</label>
                                        <input
                                            type='text'
                                            className='conditionName p-2 rounded border border-gray-500 outline-primary'
                                            name='conditionName'
                                            placeholder='Conditon name'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="diagnoseDate">Diagnose Date</label>
                                        <input
                                            type='date'
                                            className='conditionName p-2 rounded border border-gray-500 outline-primary'
                                            name='diagnosedDate'
                                            placeholder='Diagnose Date'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="conditionType">Condition Type</label>
                                        <select className='p-2 rounded border border-gray-500 outline-primary'
                                        name="conditionTpe" id="conditionType">
                                            <option value="">Condition Type</option>
                                            <option value="N/A">N/A</option>
                                            <option value="chronic">Chronic</option>
                                            <option value="acute">Acute</option>
                                            <option value="infectious">infectious</option>
                                            <option value="genetal">Genetal</option>
                                            <option value="mentalHealth">MentalHealth</option>
                                            <option value="autoImmune">Auto Immune</option>
                                            <option value="cancer">Cancer</option>
                                            <option value="cardiovascular">Cardiovascular</option>
                                            <option value="respiratoty">Respiratory</option>
                                            <option value="neurological">Neurological</option>
                                            <option value="pregnancyComplicaiton">Pregnancy Complication</option>
                                            <option value="congenital">Congenital</option>
                                            <option value="subtanceAbuse">Subtance Abuse</option>
                                        </select>
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="conditonSeverity">Severity</label>
                                        <select 
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        name="conditionSeverity" id="conditionSeverity">
                                            <option value="">Severity</option>
                                            <option value="mid">Mid</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="severe">Severe</option>
                                        </select>
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="severity">Condition Status</label>
                                        <select 
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        name="conditionStatus" id="conditionStatus">
                                            <option value="">Status</option>
                                            <option value="active">Active</option>
                                            <option value="progressive">Progressive</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="severity">Resolution Date</label>
                                        <input 
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        name='resolutionDate'
                                        type="date" />
                                    </div>

                                    <div className="container mt-auto">
                                        <button 
                                        className='bg-primary p-2 rounded border border-gray-500 outline-primary w-full text-white text-md'
                                        >
                                        +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*Alllergies*/}
                        <div className="allergies-info-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Dna className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>Allergies</h3>
                                </div>

                                <div className="sub-text">
                                    <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                </div>
                            </div>
                                                    
                            <div className="allergies-info flex justify-center mb-10">
                                <div className="grid-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-5">

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="allergyName">Allergy Name</label>
                                        <input 
                                        id='allergyName'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='e.g seafood allergy'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="allergyName">Allergy Type</label>
                                        <input 
                                        id='allergyType'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='e.g Food,Medication etc.'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="allergyReaction">Allergy Reaction</label>
                                        <input 
                                        id='allergyReaction'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='e. Difficulty in breathing, Rushes etc.'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-semibold' htmlFor="Severity">Severity</label>
                                        <select 
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        name="allergySeverity" id="allergySeverity">
                                            <option value="N/A">Severity</option>
                                            <option value="mid">Mid</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="severe">Severe</option>
                                        </select>
                                    </div>

                                    <div className="container">
                                        <button 
                                        className='bg-primary p-2 rounded border border-gray-500 outline-primary w-full text-white text-md'
                                        >
                                        +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/*LAB Results*/}

                        <div className="lab-result-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Dna className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>LAB Result</h3>
                                </div>

                                <div className="sub-text">
                                    <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                </div>
                            </div>
                                                    
                            <div className="labResult-info flex justify-center mb-10">
                                <div className="grid-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-5">
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="testName">Test Name</label>
                                        <input 
                                        id='testName'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Test Name'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="testDate">Date of Test</label>
                                        <input 
                                        id='testDate'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="date" 
                                        placeholder='Date of Test'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="testResult">Test Result</label>
                                        <input 
                                        id='testResult'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Test Result'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="referenceRange">Reference Rnage</label>
                                        <input 
                                        id='referenceRange'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='e.g 40-60'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="testFlag">Flag</label>
                                        <select 
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        name="testFlag" id="testFlag">
                                            <option value="N/A">Flag</option>
                                            <option value="Normal">Normal</option>
                                            <option value="High">High</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>

                                    <div className="container mt-auto">
                                        <button 
                                        className='bg-primary p-2 rounded border border-gray-500 outline-primary w-full text-white text-md'
                                        >
                                        +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*IMMUNIZATIONS*/}


                        <div className="immunizations-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Syringe className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>IMMUNIZATIONS</h3>
                                </div>

                                <div className="sub-text">
                                    <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                </div>
                            </div>
                                                    
                            <div className="immunization-info flex justify-center mb-10">
                                <div className="grid-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-5">
                                    
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="vaccineName">Name of Vaccine</label>
                                        <input 
                                        id='vaccineName'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Name of Vaccine'
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="dateGiven">Date Given</label>
                                        <input 
                                        id='dateGiven'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="date" 
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="nextDue">Next Due</label>
                                        <input 
                                        id='nextDue'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="date" 
                                        />
                                    </div>

                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="givenBy">Given By</label>
                                        <input 
                                        id='givenBy'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Name of Administered'
                                        />
                                    </div>


                                

                                    <div className="container mt-auto">
                                        <button 
                                        className='bg-primary p-2 rounded border border-gray-500 outline-primary w-full text-white text-md'
                                        >
                                        +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="button-container flex justify-center items-center m-5 gap-4">
                            <button 
                                className='bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2'
                                  onClick={(e) =>{
                                    e.preventDefault();
                                    prevStep()
                                }}>
                                <ArrowBigLeft/>
                                Previous
                            </button>

                            <button 
                                className='bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2'
                                  onClick={(e) =>{
                                    e.preventDefault();
                                    nextStep()
                                }}>
                                    Next
                                <ArrowBigRight/>
                            </button>

                        </div>
                    </>
                )}

                {step === 3 &&(
                    <>
                    {/*Prescriptions*/}

                    <div className="prescription-card border border-gray-300 mt-10 rounded-lg">
                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Pill className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>Prescription</h3>
                                </div>

                                <div className="sub-text">
                                    <p className='text-sm text-gray-500'><em>Type N/A if not applicable</em></p>
                                </div>
                            </div>
                                                    
                            <div className="prescription-info flex justify-center mb-10">
                                <div className="grid-container grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-[90%] gap-5">
                                    
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="medicationName">Medication Name</label>
                                        <input 
                                        id='medicationName'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Medication Name'
                                        />
                                    </div>

                                    
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="dosage">Dosage</label>
                                        <input 
                                        id='dosage'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Dosage'
                                        />
                                    </div>

                                    
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="quantity">Quantity</label>
                                        <input 
                                        id='quantity'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="number" 
                                        placeholder='Quantity'
                                        />
                                    </div>

                                    
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="datePrescribe">Date of Prescribe</label>
                                        <input 
                                        id='datePrescribed'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="date" 
                                        />
                                    </div>

                                    
                                    <div className="container flex flex-col">
                                        <label className='text-sm font-bold' htmlFor="prescribeBy">Prescribe By</label>
                                        <input 
                                        id='prescribeBy'
                                        className='p-2 rounded border border-gray-500 outline-primary'
                                        type="text" 
                                        placeholder='Name of Provider'
                                        />
                                    </div>

                                    <div className="container mt-auto">
                                        <button 
                                        className='bg-primary p-2 rounded border border-gray-500 outline-primary w-full text-white text-md'
                                        >
                                        +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*Clinical Notes*/}

                        <div className="reason-for-visit-card border border-gray-300 mt-10 rounded-lg">

                            <div className="title flex flex-col m-5">
                                <div className="main-text flex flex-cols items-center gap-2">
                                    <Stethoscope className='text-secondary h-5'/>
                                    <h3 className='text-2xl font-semibold text-primary'>Clinical Notes</h3>
                                </div>
                            </div>

                            <div className="text-area px-10 mb-5">
                                <textarea
                                    required
                                    id="message"
                                    name="clinicalNotes"
                                    placeholder="Type something here..."
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        
                        </div>

                        <div className="button-container flex justify-center items-center m-5 gap-4">
                            <button 
                                className='bg-primary rounded px-6 py-2 text-white flex flex-cols items-center gap-2'
                                >
                                Save to Records
                            </button>

                        </div>


                    </>
                )}

            </form>
                </div>
            </div>
        </div>
    )
    }

    export default AddtoRecords
