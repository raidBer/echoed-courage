import { Fragment } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

import {
  XMarkIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function SlideOver({
  open,
  setOpen,
  shortStory,
  setShortStory,
  models,
  size,
  setSize,
  handleSubmit,
}) {
  return (
    <Transition.Root show={open ? true : false} as={Fragment}>
      <Dialog
        as="div"
        className="relative font-serif tracking-wide z-1"
        onClose={setOpen}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex h-full flex-col divide-y divide-darkWhite bg-white shadow-xl"
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="border-l-2 border-darkWhite bg-darkBlue px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base flex items-center font-semibold leading-6 text-white">
                            <Cog6ToothIcon
                              className="w-5 h-5 text-white sm:mr-2"
                              aria-hidden="true"
                            />
                            <span>Settings</span>
                          </Dialog.Title>

                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-darkBlue text-lightWhite hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-darkWhite px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="description"
                                className="block font-bold text-sm leading-6 text-gray-900"
                              >
                                Llama Size
                              </label>

                              <p
                                id="system-prompt-description"
                                className="mt-2 text-xs text-darkBlue"
                              >
                                More parameters make the model smarter but
                                slower.
                              </p>
                              <div className="">
                                <Listbox value={size} onChange={setSize}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                      <span className="block truncate">
                                        {size ? size.name : "loading..."}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          className="h-5 w-5 text-darkWhite"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute mt-1 max-h-60 w-full shadow-md overflow-auto border-darkBlue rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {models
                                          ? models.map((model, modelIdx) => (
                                              <Listbox.Option
                                                key={modelIdx}
                                                className={({ active }) =>
                                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                      ? "bg-lightWhite text-darkBlue"
                                                      : "text-darkBlue"
                                                  }`
                                                }
                                                value={model}
                                              >
                                                {({ selected }) => (
                                                  <>
                                                    <span
                                                      className={`block truncate ${
                                                        selected
                                                          ? "font-medium"
                                                          : "font-normal"
                                                      }`}
                                                    >
                                                      {model.name}
                                                    </span>
                                                    {selected ? (
                                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-darkWhite">
                                                        <CheckIcon
                                                          className="h-5 w-5"
                                                          aria-hidden="true"
                                                        />
                                                      </span>
                                                    ) : null}
                                                  </>
                                                )}
                                              </Listbox.Option>
                                            ))
                                          : null}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </Listbox>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6 pb-5 pt-6">
                            <div className="flex items-center">
                              <label
                                htmlFor="shortStoryMode"
                                className="text-sm font-bold leading-6 mr-2 text-gray-900"
                              >
                                Short story mode
                              </label>
                              <input
                                className={`
                                relative peer shrink-0
                                appearance-none w-4 h-4 border-2 border-darkBlue rounded-sm bg-white
                                mt-1 checked:bg-darkBlue checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100`}
                                type="checkbox"
                                checked={shortStory}
                                onChange={() => {
                                  setShortStory(!shortStory);
                                  console.log(shortStory);
                                }}
                                role="switch"
                              />
                            </div>

                            <p
                              className="mt-2 text-xs text-gray-500"
                              id="temperature-description"
                            >
                              Control the additional details and the length of
                              story
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
