import styled from 'styled-components'

export const TipTapStyled = styled.div`
   .ProseMirror {
      p.is-editor-empty:first-child::before {
         color: #adb5bd;
         content: attr(data-placeholder);
         float: left;
         height: 0;
         pointer-events: none;
      }
      background: white;
      margin-top: 10px;
      > * + * {
         margin-top: 0.75em;
      }
      border: black thin solid;
      padding: 10px 20px 20px 20px;
      ul,
      ol {
         padding: 0 1rem;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
         line-height: 1.1;
      }

      code {
         background-color: rgba(#616161, 0.1);
         color: #616161;
      }

      pre {
         background: #0d0d0d;
         color: #fff;
         font-family: 'JetBrainsMono', monospace;
         padding: 0.75rem 1rem;
         border-radius: 0.5rem;

         code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
         }
      }

      img {
         max-width: 100%;
         height: auto;
      }

      blockquote {
         padding-left: 1rem;
         border-left: 2px solid rgba(#0d0d0d, 0.1);
      }

      hr {
         border: none;
         border-top: 2px solid rgba(#0d0d0d, 0.1);
         margin: 2rem 0;
      }
   }
`
