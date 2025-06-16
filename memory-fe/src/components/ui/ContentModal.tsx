import axios from "axios"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "./Input"
import { Button } from "./Button"
import { CloseIcon } from "../../icons/CloseIcon"
import { useDispatch } from "react-redux"
import { addBrains } from "../../store/Slice"
import { useNavigate } from "react-router-dom"
interface Modal {
  isOpen: boolean,
  onClose: () => void
}

type ContentInput = {
  link: string,
  title: string,
  type: "tweet" | "youtube"
}

export const ContentModal = (props: Modal) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContentInput>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addContent: SubmitHandler<ContentInput> = async (data) => {
    setLoading(true)
    const updatedData = {
      link: data.link.trim(),
      title: data.title.trim(),
      type: data.type[0].trim().toString()
    }
    try {
      const contentReq = await axios.post('https://memory-quilt-backend.onrender.com/api/v1/content', updatedData, {
        withCredentials: true
      })
      if (!contentReq) {
        setError('Failed to process request !!')
      }
      dispatch(addBrains(contentReq.data.content))
      setLoading(false)
      props.onClose()
      navigate('/home')
    } catch (error: any) {
      setError(error)
    }
  }

  return props.isOpen ? (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl" />
      
      <form 
        onSubmit={handleSubmit(addContent)} 
        className="relative z-10 flex flex-col h-[30vw] w-[45vw] p-8 rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-50" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Add Content</h2>
            <p className="text-slate-400 text-sm">Save your favorite tweets and videos</p>
          </div>
          <button
            type="button"
            onClick={props.onClose}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 group"
          >
            <CloseIcon size="md" className="text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 relative z-10">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-6 mb-8 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Content Link</label>
            <div className="relative">
              <Input 
                placeholder="Paste your tweet or YouTube link here"
                type="text" 
                size="md"
                className="w-full bg-slate-800/50 border-slate-600/50 hover:border-slate-500/50 focus:border-violet-500/50 text-white placeholder-slate-400 rounded-xl transition-all duration-200"
                {...register("link", {
                  required: "Link is required",
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|x\.com\/[A-Za-z0-9_]+\/status\/|twitter\.com\/[A-Za-z0-9_]+\/status\/)\w+/,
                    message: "Please enter a valid Twitter/X or YouTube link"
                }
                })}
              />
              {errors.link && (
                <p className="text-red-400 text-xs mt-1">{errors.link.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Title</label>
            <div className="relative">
              <Input 
                placeholder="Give it a memorable title"
                type="text" 
                size="md"
                className="w-full bg-slate-800/50 border-slate-600/50 hover:border-slate-500/50 focus:border-violet-500/50 text-white placeholder-slate-400 rounded-xl transition-all duration-200"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters"
                  }
                })}
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Content Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/30 border border-slate-600/30 hover:border-blue-500/50 cursor-pointer transition-all duration-200 group">
                <input
                  type="radio"
                  value="tweet"
                  className="w-4 h-4 text-blue-500 bg-transparent border-slate-500 focus:ring-blue-500 focus:ring-2"
                  {...register("type", { required: "Please select content type" })}
                />
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <span className="text-slate-300 font-medium">Tweet</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/30 border border-slate-600/30 hover:border-red-500/50 cursor-pointer transition-all duration-200 group">
                <input
                  type="radio"
                  value="youtube"
                  className="w-4 h-4 text-red-500 bg-transparent border-slate-500 focus:ring-red-500 focus:ring-2"
                  {...register("type", { required: "Please select content type" })}
                />
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                    <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="text-slate-300 font-medium">YouTube</span>
                </div>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-400 text-xs">{errors.type.message}</p>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <Button
            title={loading ? "Adding Content..." : "Add Content"}
            size="md"
            variant={loading ? "other:hover" : "primary"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  ) : null
}