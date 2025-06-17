'use client'
import { createCategory } from "@/actions";
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure } from "@heroui/react";
import { useActionState, useEffect } from "react";

export default function CategoryAdd() {
  const [state, fromAction, isPending] = useActionState(createCategory, {});
  const {isOpen, onOpen, onClose} = useDisclosure();
  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [state, onClose])
  return (
    <div>
      <Button className="bg-black text-white" onPress={() => onOpen()}>新增分类</Button>
      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">新增分类</ModalHeader>
              <ModalBody>
              <Form className="w-full flex flex-col gap-4 py-4" action={fromAction}>
                  <Input
                    isRequired
                    errorMessage="请输入有效的分类名称"
                    label="名称"
                    labelPlacement="outside"
                    name="name"
                    placeholder="输入分类名称"
                    type="text"
                    minLength={2}
                    maxLength={20}
                  />

                  <Textarea
                    isRequired
                    errorMessage="请输入有效的描述"
                    label="描述"
                    labelPlacement="outside"
                    name="description"
                    placeholder="输入分类的描述"
                    type="text"
                    minLength={2}
                    maxLength={200}
                  />
                  {state.errors &&
                    <p className='w-full text-sm text-red-500'>{state.errors.join(',')}</p>
                  }
                  <div className='w-full flex justify-end gap-2 py-4'>
                    <Button color="default" variant="bordered" onPress={onClose}>取消</Button>
                    <Button className='bg-black text-white' isLoading={isPending} type='submit'>新增</Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
