"use client"

import { Component, ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary capturou um erro:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-rose-100 p-4">
              <svg
                className="h-8 w-8 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-rose-900">
                Algo deu errado
              </h3>
              <p className="mt-2 text-sm text-rose-700">
                {this.state.error?.message || "Ocorreu um erro inesperado"}
              </p>
            </div>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
              variant="outline"
              className="mt-4"
            >
              Recarregar página
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

