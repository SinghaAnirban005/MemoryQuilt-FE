import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { CloseIcon } from "../../icons/CloseIcon"
import { useDispatch, useSelector } from "react-redux"
import { link } from "../../store/Slice"
import { RootState } from "../../store/Store"

interface Modal {
  isOpen: boolean,
  onClose: () => void
}

export const ShareModal = (props: Modal) => {
  const [error, setError] = useState('')
  const [shareLink, setShareLink] = useState('')
  const [copied, setCopied] = useState(false)
  const dispatch = useDispatch()
  const sharableLink = useSelector((state: RootState) => state.link)

  const handleShare = async () => {
    try {
      const shareReq = await axios.post('https://memory-quilt-backend.onrender.com/api/v1/memory/share', {
        share: true
      }, {
        withCredentials: true
      })
      setShareLink(`https://memory-quilt-fe.vercel.app/memory/${shareReq.data.hash}`)
      dispatch(link(shareReq.data.hash))
    } catch (error: any) {
      setError(error)
    }
  }

  useEffect(() => {
    if (shareLink !== '') {
      setShareLink(`https://memory-quilt-fe.vercel.app/memory/${sharableLink}`)
    } else {
      setShareLink('')
    }
  }, [shareLink])

  const deleteShare = async () => {
    try {
      await axios.post('https://memory-quilt-backend.onrender.com/api/v1/memory/share', {
        share: false
      }, {
        withCredentials: true
      })
      setShareLink('')
      dispatch(link(''))
    } catch (error: any) {
      setError(error)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return props.isOpen ? (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl" />
      
      <div className="relative z-10 flex flex-col h-[32vw] w-[45vw] p-8 rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-50" />

        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Share Your Brain</h2>
            <p className="text-slate-400 text-sm">Make your collection public and shareable</p>
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

        <div className="flex-1 flex flex-col justify-center items-center space-y-8 relative z-10">
          {shareLink ? (
            <div className="w-full space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Your Brain is Now Public!</h3>
                <p className="text-slate-400">Share this link with anyone to showcase your collection</p>
              </div>

              <div className="relative">
                <div className="flex">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-l-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-500 border border-violet-500 rounded-r-xl text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    {copied ? (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied!</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  title="Make Private"
                  size="md"
                  variant="secondary"
                  type="button"
                  onClick={deleteShare}
                />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Share Your Collection</h3>
                <p className="text-slate-400 max-w-md">
                  Generate a public link to showcase your curated tweets and videos with others
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto text-left">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span className="text-slate-300">Public access to your brain</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-slate-300">Easy to share link</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-300">Revoke access anytime</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {!shareLink && (
          <div className="flex justify-center space-x-4 relative z-10">
            <Button
              title="Cancel"
              size="md"
              variant="secondary"
              type="button"
              onClick={props.onClose}
            />
            <Button
              title="Generate Link"
              size="md"
              variant="primary"
              type="button"
              onClick={handleShare}
            />
          </div>
        )}
      </div>
    </div>
  ) : null
}