'use client';
import { saveJobAction } from "@/app/actions/jobActions";
import type { Job } from "@/models/Job";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, RadioGroup, TextArea, TextField, Theme, Flex, Box } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useState } from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

export default function JobForm({orgId,jobDoc}:{orgId:string;jobDoc?:Job}) {
  const [countryId, setCountryId] = useState(Number(jobDoc?.countryId) || 0);
  const [stateId, setStateId] = useState(Number(jobDoc?.stateId) || 0);
  const [cityId, setCityId] = useState(Number(jobDoc?.cityId) || 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || '');
  const [stateName, setStateName] = useState(jobDoc?.state || '');
  const [cityName, setCityName] = useState(jobDoc?.city || '');
  const [remote, setRemote] = useState(jobDoc?.remote || 'hybrid');
  const [jobType, setJobType] = useState(jobDoc?.type || 'full');

  async function handleSaveJob(data:FormData) {
    data.set('country', countryName.toString());
    data.set('state', stateName.toString());
    data.set('city', cityName.toString());
    data.set('countryId', countryId.toString());
    data.set('stateId', stateId.toString());
    data.set('cityId', cityId.toString());
    data.set('orgId', orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }

  return (
    <Theme>
      <form
        action={handleSaveJob}
        className="container mt-6 flex flex-col gap-4"
      >
        {jobDoc && (
          <input type="hidden" name="id" value={jobDoc?._id}/>
        )}
        <Box maxWidth="300px" maxHeight="300px">
          <TextField.Root 
            name="title" 
            size="3"
            placeholder="Job title" 
            defaultValue={jobDoc?.title || ''} 
            className="rounded-md">
          </TextField.Root>
        </Box>
        
        <div className="grid sm:grid-cols-3 gap-6 *:grow">
          <div>
            Remote?
            <RadioGroup.Root value={remote} name="remote" onValueChange={setRemote}>
              <div>
                <RadioGroup.Item value="onsite" id="onsite" className="flex items-center">
                  <input type="radio" value="onsite" checked={remote === 'onsite'} onChange={() => setRemote('onsite')} />
                  <label htmlFor="onsite" className="ml-2">On-site</label>
                </RadioGroup.Item>
              </div>
              <div>
                <RadioGroup.Item value="hybrid" id="hybrid" className="flex items-center">
                  <input type="radio" value="hybrid" checked={remote === 'hybrid'} onChange={() => setRemote('hybrid')} />
                  <label htmlFor="hybrid" className="ml-2">Hybrid-remote</label>
                </RadioGroup.Item>
              </div>
              <div>
                <RadioGroup.Item value="remote" id="remote" className="flex items-center">
                  <input type="radio" value="remote" checked={remote === 'remote'} onChange={() => setRemote('remote')} />
                  <label htmlFor="remote" className="ml-2">Fully remote</label>
                </RadioGroup.Item>
              </div>
            </RadioGroup.Root>
          </div>
          <div>
            Full-Time?
            <RadioGroup.Root value={jobType} name="type" onValueChange={setJobType}>
              <RadioGroup.Item value="full" id="full" className="flex items-center">
                <input type="radio" value="full" checked={jobType === 'full'} onChange={() => setJobType('full')} />
                <label htmlFor="full" className="ml-2">Full-time</label>
              </RadioGroup.Item>
              <RadioGroup.Item value="part" id="part" className="flex items-center">
                <input type="radio" value="part" checked={jobType === 'part'} onChange={() => setJobType('part')} />
                <label htmlFor="part" className="ml-2">Part-time</label>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''} className="flex gap-1">
              <TextField.Slot side="left">
                $
              </TextField.Slot>
              <TextField.Slot side="right">
                k/year
              </TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div>
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow">
            <CountrySelect 
                onChange={(e:any) => {
                    setCountryId(e.id);
                    setCountryName(e.name);
                }}
                placeHolder="Select country"
            />
            <StateSelect
              countryid={countryId}
              onChange={(e:any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e:any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>

        </div>
        <div className="flex sm:flex">
          <div className="grow">
            <h3>Contact person</h3>
            <div className="flex gap-2">
              <div className="grow flex flex-col gap-1">
                <TextField.Root
                  placeholder="John Doe"
                  name="contactName"
                  defaultValue={jobDoc?.contactName || ''} className="border-gray-600">
                    <TextField.Slot className="flex ml-2">
                      <FontAwesomeIcon icon={faUser}/>
                    </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Phone"
                  type="tel"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone || ''}>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone}/>
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  name="contactEmail"
                  defaultValue={jobDoc?.contactEmail || ''}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope}/>
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
          <TextArea
            defaultValue={jobDoc?.description || ''}
            size="3"
            placeholder="Job description"
            resize="vertical"
            name="description" />
        <div className="flex justify-center">
          <Button size="3" className="text-white bg-blue-600 rounded-md p-2">
            <span className="px-4">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}