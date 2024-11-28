import { Button } from "../../../securitysidelogic/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../securitysidelogic/components/ui/card"
import { Input } from "../../../securitysidelogic/components/ui/input"
import { Textarea } from "../../../securitysidelogic/components/ui/textarea"
import React from "react"

interface AskQuestionProps {
  onSubmit: (title: string, content: string) => void
  onClose: () => void
}

export function AskQuestion({ onSubmit, onClose }: AskQuestionProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const title = (form.elements.namedItem('title') as HTMLInputElement).value
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value
    if (title.trim() && content.trim()) {
      onSubmit(title, content)
      form.reset()
      onClose()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Writing a good question</CardTitle>
        <CardDescription>
          You're ready to ask a programming-related question and this form will help guide you through the process.
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add "tags" which help surface your question to members of the community.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input name="title" placeholder="e.g. Is there an R function for finding the index of an element in a vector?" required />
          </div>
          <div>
            <Textarea
              name="content"
              placeholder="Describe your problem in detail..."
              className="min-h-[150px]"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

